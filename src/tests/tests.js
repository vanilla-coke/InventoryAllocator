"use strict";

const { InventoryAllocator } = require("../inventoryAllocator");
const expect  = require('chai').expect;

let allocator = new InventoryAllocator;

let testWarehouses = [
    { name: "AMZN", inventory: { apple: 4, banana: 2 } },
    { name: "STBK", inventory: { apple: 2, pear: 2 } },
    { name: "GOOG", inventory: { pineapple: 2, banana: 2 } },
    { name: "FB", inventory: { oranges: 8, beans: 5 } },
    { name: "APPL", inventory: { pineapple: 4, grapes: 3 } },
];

let test_no = 1; // Only used for verbose output with test cases

describe( " Testing Inventory Allocator for warehouse shipping " , () => {

    describe( " computing possible orders " , () => {

        it( " Should return an array of objects that contain the correct quantity of items required, all sources from a SINGLE warehouse " , ( done ) => {
    
            let testItems = { apple: 4, pear: 2, pineapple: 2 };
            let expected_results = [
                { AMZN: { apple: 4 } },
                { STBK: { pear: 2 } },
                { GOOG: { pineapple: 2 } }
              ];
            let results = allocator.calculateCheapestShipment( testItems, testWarehouses );

            expect( results.length ).to.equal( 3 );
            expect( JSON.stringify( results )).to.equal( JSON.stringify( expected_results ));
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("EXPECTED RESULTS TEST " + test_no);
            console.log(expected_results);
            console.log("ACTUAL RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();           
        });

        it( " Should return an array of objects that contain the correct quantity of items required, sourced from a MULTIPLE warehouses (i.e. split) " , ( done ) => {
    
            let testItems = { apple: 5, pineapple: 6, banana: 4 };
            let expected_results = [
                { AMZN: { apple: 4 }, STBK: { apple: 1 } },
                { GOOG: { pineapple: 2 }, APPL: { pineapple: 4 } },
                { AMZN: { banana: 2 }, GOOG: { banana: 2 } }
              ];
            let results = allocator.calculateCheapestShipment( testItems, testWarehouses );

            expect( results.length ).to.equal( 3 );
            expect( JSON.stringify( results )).to.equal( JSON.stringify( expected_results ));
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("EXPECTED RESULTS TEST " + test_no);
            console.log(expected_results);
            console.log("ACTUAL RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();           
        });

        it( " Should return an array of objects that contain the correct quantity of SOME items only i.e. some were not found/insufficient quantity " , ( done ) => {

            let testItems = { apple: 5, pineapple: 6, banana: 5, carrots: 2 };
            let expected_results = [
                { AMZN: { apple: 4 }, STBK: { apple: 1 } },
                { GOOG: { pineapple: 2 }, APPL: { pineapple: 4 } }
              ];
            let results = allocator.calculateCheapestShipment( testItems, testWarehouses );

            expect( results.length ).to.equal( 2 );
            expect( JSON.stringify( results )).to.equal( JSON.stringify( expected_results ));
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("EXPECTED RESULTS TEST " + test_no);
            console.log(expected_results);
            console.log("ACTUAL RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();           
        });
    });

    describe( " computing impossible orders " , () => {

        it( " Should return an empty array as insufficient amount of inventory for each item was avaialble " , ( done ) => {
    
            let testItems = { apple: 7, pear: 3, pineapple: 10 };
            let results = allocator.calculateCheapestShipment( testItems, testWarehouses );

            expect( results.length ).to.equal( 0 );
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();     
        });

        it( " Should return an empty array as each item is non-existent in any warehouse " , ( done ) => {
    
            let testItems = { suagr: 4, grapefruit: 2, carrots: 2 };
            let results = allocator.calculateCheapestShipment( testItems, testWarehouses );

            expect( results.length ).to.equal( 0 );
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();            
        });

        it( " Should return an empty array as an empty object of items was given " , ( done ) => {
    
            let testItems = { };
            let results = allocator.calculateCheapestShipment( testItems, testWarehouses );

            expect( results.length ).to.equal( 0 );
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();           
        });

        it( " Should return an empty array as an empty array of warehosues was given " , ( done ) => {
    
            let testItems = { apple: 4, pear: 2, pineapple: 2 };
            let empty_warehouse = [];
            let results = allocator.calculateCheapestShipment( testItems, empty_warehouse );

            expect( results.length ).to.equal( 0 );
            /*
            NOTE: uncomment this section if you wish to see a more verbose output from the tests
            console.log("RESULTS TEST " + test_no);
            console.log(results);
            test_no++;
            */
            done();          
        });
    })
})