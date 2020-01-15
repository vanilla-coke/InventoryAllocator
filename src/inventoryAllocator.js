/*
* InventoryAllocator will compute the best way an order can be shipped (called shipments) given inventory across a set of warehouses (called inventory distribution)
*
*/

class InventoryAllocator {

    /*
     * 
     * Description: constructor for InventoryAllocator
     * Parameters: none
    */
    constructor(){};

     /**
     * Method name: calculateCheapestShipment()
     * Description: computes the best way an order can be shipped given an inventory across a set of warehouses
     * Parameters: 
     *  items - an object containing the items and the quantity of those items needed,
     *  warehouses - an array of objects that contain the warehouse name, as well as the inventory for that warehouse
     * 
     * Return: an array of objects containing the warehouse(s) and the amount taken for that item from said warehouse,
     *      or empty array if no matching items found, or insufficient stock of items
    */

    calculateCheapestShipment( items, warehouses ){

        let results = [];

        // If either input is empty simply return an empty array
        if( Object.keys( items ).length == 0 || warehouses.length == 0 ){
            return results;
        }

        for ( let current_item of Object.keys( items ) ) {

            let { [current_item]: amount_required } = items; // obtain quantity of items required      
            let stock_found = {}; // object used to store warehouses and items found
            let index = 0;

            while( amount_required > 0 && index < warehouses.length ) {

                let { name: warehouse_name } = warehouses[index]; // obtain warehouse name
                let { inventory : { [current_item] : amount_available } } = warehouses[index]; // obtain amount available
                let amount_taken = 0; // used to calculate how much inventory was taken from a specific warehouse

                if( amount_available != undefined && amount_available > 0 ) {
                    if( amount_available > amount_required ){
                        warehouses[index].inventory[warehouse_name] = amount_available - amount_required; // update warehouse inventory
                        amount_taken = amount_available - amount_required; 
                        amount_required = 0;
                    }
                    else {
                        warehouses[index].inventory[warehouse_name] = 0; // amount will always be zero because count >= amount_available
                        amount_taken = amount_available;
                        amount_required -= amount_available; // subtract amount available from count 
                    }
                    stock_found[warehouse_name] = { [current_item] : amount_taken }; // add warehouse name and total because we took some items from it
                }
                index++;
            }

            if( Object.keys( stock_found ).length > 0 && amount_required == 0 ){
                results.push( stock_found ); // only push results if we found sufficient enough items in stock
            }

        }
        return results;
    }
};


module.exports.InventoryAllocator = InventoryAllocator;