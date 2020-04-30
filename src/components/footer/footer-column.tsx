import React from "react";
import {makeStyles} from "@material-ui/core/styles";

type FooterColumnData = {
    title: string,
    url: string
}[]

interface FooterColumnProps {
    data: FooterColumnData
}

const userStyles = makeStyles((theme) => ({
    root: {
        listStyleType: 'none',
        margin: 0,
        padding: 0
    },
    header: {
        fontSize: '1.25rem',
        margin: '8px 0',
        letterSpacing: '0',
        fontWeight: 700
    },
    content: {
        fontSize: '0.875rem',
        padding: '2px',
        '&:hover': {
            color: theme.palette.secondary.main
        }
    }
}));

const FooterColumn: React.FC<FooterColumnProps> = ({data}) => {
    const classes = userStyles();

    return (
        <ul className={classes.root}>
            {
                data.map((item, i) => {
                    if (i === 0) {
                        return (
                            <li key={i}>
                                <div className={classes.header}>
                                    { item.title }
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li key={i}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <div className={classes.content}>
                                        { item.title }
                                    </div>
                                </a>
                            </li>
                            )
                    }
                })
            }
        </ul>
    )
};

export default FooterColumn