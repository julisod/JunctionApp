import React, { useMemo } from 'react'
import {
    Stepper,
    Step,
    StepConnector,
    StepLabel,
    StepContent,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

import { sortBy } from 'lodash-es'
import moment from 'moment'
import TimelineDot from 'components/generic/TimelineDot'

const StyledLine = styled(StepConnector)({
    marginLeft: '6px',
    '& .MuiStepConnector-line': {
        borderColor: '#19DDEA',
    },
})

function differentYear(event) {
    const currentYear = moment()
    return (
        currentYear.diff(event.registrationStartTime, 'years') ||
        currentYear.diff(event.registrationEndTime, 'years') ||
        currentYear.diff(event.startTime, 'years') ||
        currentYear.diff(event.endTime, 'years') ||
        currentYear.diff(event.submissionStartTime, 'years') ||
        currentYear.diff(event.reviewStartTime, 'years')
    )
}
const EventTimeline = ({ event, textColor, accentColor = undefined }) => {
    const dateString = differentYear(event) ? 'MMM D YYYY' : 'MMM D HH:mm'
    const timelineItems = useMemo(() => {
        const realItems = event.eventTimeline.items.map(item => {
            return {
                date: moment(item.startTime).format(dateString),
                dateValue: moment(item.startTime).unix(),
                completed: moment(item.startTime).isBefore(),
                title: item.title,
                active: true,
            }
        })
        const items =
            realItems.length > 0
                ? realItems
                : [
                      {
                          date: moment(event.registrationStartTime).format(
                              dateString,
                          ),
                          dateValue: moment(event.registrationStartTime).unix(),
                          completed: moment(
                              event.registrationStartTime,
                          ).isBefore(),
                          title: 'Application period begins',
                          active: true,
                      },
                      {
                          date: moment(event.registrationEndTime).format(
                              dateString,
                          ),
                          dateValue: moment(event.registrationEndTime).unix(),
                          completed: moment(
                              event.registrationEndTime,
                          ).isBefore(),
                          title: 'Application period ends',
                          active: true,
                      },
                  ]

        if (realItems.length < 1) {
            if (
                moment(event.registrationEndTime).isBetween(
                    event.startTime,
                    event.endTime,
                )
            ) {
                items.push({
                    date: moment(event.startTime).format(dateString),
                    dateValue: moment(event.startTime).unix(),
                    completed: moment(event.startTime).isBefore(),
                    title: event.name + ' begins',
                    active: true,
                })
                items.push({
                    date: moment(event.endTime).format(dateString),
                    dateValue: moment(event.endTime).unix(),
                    completed: moment(event.endTime).isBefore(),
                    title: event.name + ' ends',
                    active: true,
                })
            } else {
                items.push({
                    date: 'No Date',
                    dateValue: 'No Date',
                    completed: moment(event.endTime),
                    title: 'End of event',
                    active: true,
                })
            }
        }

        const sorted = sortBy(items, 'dateValue')

        return sorted
    }, [
        dateString,
        event.endTime,
        event.eventTimeline,
        event.name,
        event.registrationEndTime,
        event.registrationStartTime,
        event.startTime,
    ])

    return (
        <Stepper
            activeStep={0}
            orientation="vertical"
            connector={<StyledLine />}
        >
            {timelineItems.map(item => (
                <Step
                    key={item.date + item.title}
                    active={item.active}
                    completed={item.completed}
                    expanded
                >
                    <StepLabel
                        StepIconComponent={props => (
                            <TimelineDot {...props} accentColor={accentColor} />
                        )}
                        sx={{ padding: '0.2rem 0' }}
                    >
                        <Typography
                            sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}
                        >
                            {item.date}
                        </Typography>
                    </StepLabel>
                    <StepContent
                        sx={{ borderColor: '#19DDEA', marginLeft: '6px' }}
                    >
                        <Typography variant="subtitle2">
                            {item.title}
                        </Typography>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )
}

export default EventTimeline
