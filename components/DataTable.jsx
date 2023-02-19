import React from "react";
import building from '../data/building.json';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {visuallyHidden} from '@mui/utils';
import SearchComponent from "@/components/SearchComponent";
import Rating from '@mui/material/Rating';

//Sorting routine
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

//headers
const headCells = [
    {
        id: 'street',
        numeric: false,
        disablePadding: true,
        label: 'Straße',
    },
    {
        id: 'streetNumber',
        numeric: true,
        disablePadding: false,
        label: 'Nummer',
    },
    {
        id: 'postal_code',
        numeric: true,
        disablePadding: false,
        label: 'PLZ',
    },
    {
        id: 'city',
        numeric: true,
        disablePadding: false,
        label: 'Stadt',
    },
    {
        id: 'emission',
        numeric: true,
        disablePadding: false,
        label: 'Emissionen',
    },
    {
        id: 'owner',
        numeric: true,
        disablePadding: false,
        label: 'Eigentümer',
    },
    {
        id: 'yearConstruction',
        numeric: true,
        disablePadding: false,
        label: 'Baujahr',
    }, {
        id: 'netArea',
        numeric: true,
        disablePadding: false,
        label: 'Fläche',
    }, {
        id: 'buildingType',
        numeric: true,
        disablePadding: false,
        label: 'Gebäudeart',
    },
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{color: "rgb(59,130,246)"}}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar() {

    return (
        <Toolbar>
            <Typography
                sx={{flex: '1 1 100%', fontWeight: "bold", fontFamily: "Arial Black"}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Gebäudeübersicht
            </Typography>
        </Toolbar>
    );
}

export default function DataTable() {
    //hooks
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const [searchInput, setSearchInput] = React.useState('');

    const [favorites, setFavorites] = React.useState([]);
    const [favoriteMode, setFavoriteMode] = React.useState(false);

    //sorting handler
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //search filter list
    const filteredResults = building.filter((b) => b.street.toLowerCase().includes(searchInput.toLowerCase()));

    //favorite handlers
    const handleShowFavorites = () => {
        setFavoriteMode(!favoriteMode);
    }

    const handleFavoriteList = (entry) => {
        if (!favorites.includes(entry)) {
            setFavorites(favorites => [...favorites, entry]);
        } else {
            let index = favorites.indexOf(entry);
            setFavorites([...favorites.slice(0, index), ...favorites.slice(index + 1)]);
        }
    }

    return (
        <Box sx={{width: '100%', backgroundColor: "white"}}>
            <EnhancedTableToolbar setSearchInput={setSearchInput}/>
            <TableContainer>
                <Table
                    sx={{minWidth: 750}}
                    aria-labelledby="tableTitle"
                    size={'small'}
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={building.length}
                    />
                    <TableBody>
                        {stableSort(favoriteMode ? favorites : filteredResults, getComparator(order, orderBy))
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.street}
                                    >
                                        <TableCell>
                                            <Rating name="favorite" defaultValue={0} max={1}
                                                    onChange={() => handleFavoriteList(row)}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.street}
                                        </TableCell>
                                        <TableCell align="right">{row.streetNumber}</TableCell>
                                        <TableCell align="right">{row.postal_code}</TableCell>
                                        <TableCell align="right">{row.city}</TableCell>
                                        <TableCell align="right">{row.emission}</TableCell>
                                        <TableCell align="right">{row.owner}</TableCell>
                                        <TableCell align="right">{row.yearConstruction}</TableCell>
                                        <TableCell align="right">{row.netArea}</TableCell>
                                        <TableCell align="right">{row.buildingType}</TableCell>
                                    </TableRow>
                                );
                            })}


                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{display: "flex", marginTop: "20px"}}>
                <SearchComponent setSearchInput={setSearchInput} favoriteMode={favoriteMode}/>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginRight: "10px"
                }}>
                    <button style={{
                        border: "1px dotted",
                        borderRadius: "15px",
                        backgroundColor: "rgb(59,130,246)",
                        color: "white",
                        maxHeight: "30px",
                        width: "200px",
                        fontFamily: "Arial Black",
                        cursor: "pointer",
                    }} onClick={handleShowFavorites}>{favoriteMode ? "Alle zeigen" : "Nur Favoriten zeigen"}
                    </button>
                </div>
            </div>
        </Box>
    );
}
