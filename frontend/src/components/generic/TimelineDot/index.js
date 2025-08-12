import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Box } from '@mui/material'

const TimelineDot = ({ active, completed, accentColor }) => {
    return (
        <Box
            sx={{
                width: '14px',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {completed ? (
                <CheckIcon color="primary" fontSize="small" />
            ) : (
                <Box
                    sx={{
                        width: '14px',
                        height: '14px',
                        borderStyle: 'solid',
                        borderRadius: '50%',
                        borderColor: active ? accentColor || '#19DDEA' : '#ccc',
                        backgroundColor: active
                            ? 'transparent'
                            : accentColor || '#19DDEA',
                        borderWidth: '1px',
                    }}
                />
            )}
        </Box>
    )
}

export default TimelineDot
