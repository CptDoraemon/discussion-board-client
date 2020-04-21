import {makeStyles} from "@material-ui/core/styles";

const useInsertedHTMLStyle = makeStyles((theme) => ({
    root: {
        display: 'column',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        whiteSpace: 'normal',
        '& pre': {
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
        },
        '& a': {
            wordWrap: 'break-word',
            width: '100%',
        },
        '& img': {
            maxWidth: '100%',
            maxHeight: '600px',
            alignSelf: 'center',
            margin: theme.spacing(1, 0)
        },
        '& p': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        }
        // '& h1': {
        //     fontSize: '3rem',
        //     fontWeight: 700
        // },
        // '& h2': {
        //     fontSize: '2.5rem',
        //     fontWeight: 700
        // },
        // '& h3': {
        //     fontSize: '2rem',
        //     fontWeight: 700
        // },
        // '& h4': {
        //     fontSize: '1.5rem',
        //     fontWeight: 700
        // },
        // '& h5': {
        //     fontSize: '1.5rem',
        //     fontWeight: 700
        // },
        // '& p, span': {
        //     fontSize: '1.25rem',
        //     lineHeight: 1.5,
        // }
    }
}));

export default useInsertedHTMLStyle