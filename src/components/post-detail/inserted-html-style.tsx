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
            background: `linear-gradient(to bottom, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 100%)`,
            backgroundPosition: '0 100%',
            backgroundRepeat: 'repeat-x',
            backgroundSize: '4px 4px',
            transition: theme.transitions.create(['background-size', 'color']),
        },
        '& a:hover': {
            backgroundSize: '4px 100%',
            color: theme.palette.primary.contrastText,
        },
        '& img': {
            maxWidth: '100%',
            maxHeight: '600px',
            display: 'block',
            margin: '4px auto'
        },
        '& p': {

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