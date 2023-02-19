import React from "react";
import building from '../data/building.json';

export default function DataTable() {



    return (
        <div>
            {building.map((address) => address.street)}
        </div>
    );

}