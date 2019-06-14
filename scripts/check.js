var winningArray = [];
var check = 0;

function checkDiag(row, col, way) {
    check = 0;

    //Get the Numbers of the Rows And Columns
    row = parseInt(row.slice(3, 4));
    col = parseInt(col.slice(3, 4));

    //Wind Back Detector to Bottom Left
    while (row > 1 && col > 1) {
        row--;
        col--;
    }
    //While There Are Still Rows and Columns To Check
    while (row < 7 && col < 8) {
        var check1 = check;

        //Checks That Row For Matching Column + Team
        for (i = 0; i < document.getElementsByClassName(("row" + row)).length; i++) {
            var rowcheck = document.getElementsByClassName(("row" + row))[i];
            if (rowcheck.classList.contains("col" + col) && rowcheck.classList.contains(team)) {
                check++;
                winningDiagArray.push(row.toString() + col.toString())
            } 
        }
        
        //Increase Row and Column
        if (check1 == check) {
            check = 0;
            winningDiagArray = [];
            winningDiagArray.length = 0;
        } else if (check == 4) {
            while(winningDiagArray.length > 4){
                winningDiagArray.shift();
            }
            console.log(winningDiagArray)
            return true;
        }
        row++;
        col++;
    }
}

function checkDiag2(row, col, way) {
    check = 0;

    //Get the Numbers of the Rows And Columns
    row = parseInt(row.slice(3, 4));
    col = parseInt(col.slice(3, 4));

    //Wind Back Detector to Bottom Left
    while (row > 1 && col < 7) {
        row--;
        col++;
    }
    //While There Are Still Rows and Columns To Check
    while (row < 7 && col > 0) {
        var check1 = check;

        //Checks That Row For Matching Column + Team
        for (i = 0; i < document.getElementsByClassName(("row" + row)).length; i++) {
            var rowcheck = document.getElementsByClassName(("row" + row))[i];
            if (rowcheck.classList.contains("col" + col) && rowcheck.classList.contains(team)) {
                check++;
                winningDiagArray2.push(row.toString() + col.toString())
            }
        }
        
        //Increase Row and Column
        if (check1 == check) {
            check = 0;
            winningDiagArray2 = [];
            winningDiagArray2.length = 0;
        } else if (check == 4) {
            while(winningDiagArray2.length > 4){
                winningDiagArray2.shift();
            }
            return true;
        }
        row++;
        col--;
    }
}

//Rewritten
/*function checkDiag2(row, col, way) {
    check = 0;
    winningDiagArray2.length = 0;

    //Wind Back Detector to Bottom
    while (row > 1 && col < 7) {
        row--;
        col++;
    }
    //While There Are Still Rows To Check
    while (row < 7 && col > 0) {
        var istrue = CheckLine(row, col);
        
        
        row++;
        col--;
        if(istrue == true){
            winningDiagArray2 = winningArray;
            return true;
        }
    }
}*/

//Rewritten
function checkRow(row, col, way) {
    check = 0;
    winningRowArray.length = 0;

    //Wind Back Detector to Bottom
    while (col > 1) {
        col--;
    }
    //While There Are Still Rows To Check
    while (col < 8) {
        var istrue = CheckLine(row, col);
        
        
        col++;
        if(istrue == true){
            winningRowArray = winningArray;
            console.log(winningRowArray);
            //winningRowArray = ["11","12","13","14"];
            return true;
        }
    }
}

//Rewritten
function checkCol(row, col, way) {
    check = 0;
    winningColArray.length = 0;

    //Wind Back Detector to Bottom
    while (row > 1) {
        row--;
    }
    //While There Are Still Rows To Check
    while (row < 7) {
        var istrue = CheckLine(row, col);
        
        
        row++;
        if(istrue == true){
            winningColArray = winningArray;
            return true;
        }
    }
}

//Function To Check The Line For 4 Matching Tiles
function CheckLine(row, col){
    var check1 = check;
    
    //Checks That Row For Matching Column + Team
        for (i = 0; i < document.getElementsByClassName(("row" + row)).length; i++) {
            var rowcheck = document.getElementsByClassName(("row" + row))[i];
            if (rowcheck.classList.contains("col" + col) && rowcheck.classList.contains(team)) {
                check++;
                winningArray.push(row.toString() + col.toString())
            } 
        }
        
        //Increase Row and Column
        if (check1 == check) {
            check = 0;
            winningArray = [];
            winningArray.length = 0;
        } else if (check == 4) {
            while(winningArray.length > 4){
                console.log("Too Long: " + winningArray)
                winningArray.shift();
            }
            return true;
        }
}