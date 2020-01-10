export const isReceivedSupply = (supply, student) => {
    return student.receivedSupplies.some(rs => (rs.id === supply._id && !rs.incomplete))
}

export const isReturnedSupply = (supply, student) => {
    return student.returnedSupplies.some(rs => rs.id === supply._id)
}

export const getSupplyReport = (supply, students) => {
    return students.every(student => {
        if(!isReceivedSupply(supply, student)){
            return false;
        }else if(supply.didactic && !isReturnedSupply(supply, student)) {
            return false;            
        } else{
            return true;
        }      
    });
}

export const getStudentReport = (supplies, student) => {
    return supplies.every(supply => {
        if(!isReceivedSupply(supply, student)){
            return false;
        }
        if(supply.didactic && !isReturnedSupply(supply, student)) {
            return false;
        }else{
            return true;
        }
    });
    
}

export const getGradeReport = (supplies, students) => {
    return (
        supplies.every(supply => {
        if(!getSupplyReport(supply, students)){
            return false;
        } else {
            return true;
        }
        }) &&
        students.every(student => {
            if(!getSupplyReport(supplies, student)){
                return false;
            } else {
                return true;
            }
        })
    )
}

