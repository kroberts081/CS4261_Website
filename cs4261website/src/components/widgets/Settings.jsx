import React, { useState } from 'react';
import Text from '../elements/Text';
import Card from '../elements/Card';
import Button from '../elements/Button';

const Settings = ({setOpen, workMin, breakMin, setBreakMin, setWorkMin}) => {
    

    const backButton = () => {
        setOpen(false);
    }

    return(
        <>
            <Card>
                <Text className="text-center text-white">
                    Focus time (in minutes): 45 {workMin}
                </Text>
                
            </Card>

            <Card>
                <Text className="text-center text-white">
                    Break time (in minutes): 15 {breakMin}
                </Text>
            </Card>

            <div>
                <Button onClick={backButton} className="py-1 px-6">
                    {"<--- "}Back
                </Button>
            </div>
            
        </>
    )
}

export default Settings