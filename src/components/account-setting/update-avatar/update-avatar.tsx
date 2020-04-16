import React, {ReactElement, useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {GenericClickButton} from "../../commons/generic-button";
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ReactCrop, {Crop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ErrorMessage from "../../commons/error-message";
import getCroppedImg from "./get-cropped-image";
import useUpdateAvatar from "../../../requests/useUpdateAvatar";

enum Stage {
    'UPLOAD' = 'UPLOAD',
    'CROP' = 'CROP',
    'CONFIRM' = 'CONFIRM',
    'FINISH' = 'FINISH'
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    backNextButtons: {
        width: '100%',
        margin: theme.spacing(1, 0),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: '500px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    centering: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

interface FinishStageProps {
    restart: () => void
}

const FinishStage: React.FC<FinishStageProps> = ({restart}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.backNextButtons}>
                <GenericClickButton onClick={restart} width={'150px'} text={'Start Again'}/>
            </div>
            <div>
                All set
            </div>
        </>
    )
};

interface ConfirmStageProps {
    blob: Blob | null,
    back: () => void,
    next: () => void,
}

const ConfirmStage: React.FC<ConfirmStageProps> = ({blob, back, next}) => {
    const classes = useStyles();

    const [loading, error, errorMessage, upload] = useUpdateAvatar();

    const GoNext = async () => {
        try {
            if (blob) {
                const uploaded = await upload(blob);
                if (uploaded) {
                    next();
                }
            }
        } catch (e) {}
    };

    return (
        <>
            <div className={classes.backNextButtons}>
                <Box>
                    <GenericClickButton onClick={back} width={'150px'} text={'Redo Cropping'}/>
                </Box>
                <Box>
                    <GenericClickButton onClick={GoNext} width={'150px'} text={'Update Avatar'} disabled={loading}/>
                </Box>
            </div>
            <ErrorMessage loading={loading} error={error} errorMessage={errorMessage}/>
            <div className={classes.centering}>
                <img src={URL.createObjectURL(blob)} className={classes.image}/>
            </div>
        </>
    )
};

interface CropStageProps {
    src: string,
    back: () => void,
    next: (blob: Blob) => void
}

const CropStage: React.FC<CropStageProps> = ({src, back, next}) => {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop>({
        aspect: 1,
        unit: '%',
        height: 100,
        x: 25,
    });

    const goNext = async () => {
        try {
            console.log(image);
            if (!image) return;
            const croppedSrc = await getCroppedImg(image, crop, ' ');
            console.log(croppedSrc);
            if (croppedSrc) {
                next(croppedSrc);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className={classes.backNextButtons}>
                <Box justifySelf={'flex-start'}>
                    <GenericClickButton onClick={back} width={'150px'} text={'Repick'}/>
                </Box>
                <Box justifySelf={'flex-end'}>
                    <GenericClickButton onClick={goNext} width={'150px'} text={'Crop'}/>
                </Box>
            </div>

            <ReactCrop
                src={src}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                className={classes.image}
                ruleOfThirds={true}
                onImageError={() => setError(true)}
                onImageLoaded = {(image) => setImage(image)}
            />
            {
                error &&
                <ErrorMessage loading={false} error={true} errorMessage={'Image can\'t be loaded'}/>
            }
        </>
    )
};

interface UploadStageProps {
    next: (src: string) => void,
}

const UploadStage: React.FC<UploadStageProps> = ({next}) => {
    const classes = useStyles();
    const inputRef = useRef<HTMLInputElement>(null);
    const [link, setLink] = useState('');

    const openFileInput = () => {
        inputRef.current?.click();
    };

    const handleFiles = () => {
        if (
            inputRef.current &&
            inputRef.current.files &&
            inputRef.current.files.length
        ) {
            const files = inputRef.current.files;
            next(URL.createObjectURL(files[0]));
        }
    };

    useEffect(() => {
        inputRef.current?.addEventListener('change', handleFiles)
    }, []);

    return (
        <div style={{width: '100%'}}>
            {/*<Box width={'80%'}>*/}
                {/*<Box my={1}>*/}
                {/*    <TextField label="From Link" fullWidth value={link} onChange={(e) => setLink(e.currentTarget.value)}/>*/}
                {/*</Box>*/}
                <div className={classes.centering}>
                    {/*<Box>*/}
                    {/*    <GenericClickButton onClick={() => next(link)} width={'150px'} text={'Get Image'}/>*/}
                    {/*</Box>*/}
                    {/*<Box mx={1}> or </Box>*/}
                    <Box>
                        <GenericClickButton onClick={openFileInput} width={'150px'} text={'Upload From Disk'}/>
                    </Box>
                    <input type="file" ref={inputRef} accept="image/*" style={{display: 'none'}}/>
                </div>
            {/*</Box>*/}
        </div>
    )
};

interface UpdateAvatarProps {

}

const UpdateAvatar: React.FC<UpdateAvatarProps> = ({}) => {
    const classes = useStyles();

    const [stage, setStage] = useState(Stage.UPLOAD);
    const [imageSrc, _setImageSrc] = useState('');
    const [croppedImageBlob, _setCroppedImageBlob] = useState<Blob | null>(null);

    const moveToUploadStage = () => {
        setStage(Stage.UPLOAD)
    };

    const moveToCropStage = (src: string) => {
        _setImageSrc(src);
        setStage(Stage.CROP);
    };

    const backToCropStage = () => {
        setStage(Stage.CROP);
    };

    const moveToConfirmStage = (cropped: Blob) => {
        _setCroppedImageBlob(cropped);
        setStage(Stage.CONFIRM);
    };

    const moveToFinishStage = () => {
        setStage(Stage.FINISH);
    };

    let content;
    switch (stage) {
        case Stage.UPLOAD:
            content = <UploadStage next={moveToCropStage} />;
            break;
        case Stage.CROP:
            content = <CropStage src={imageSrc} back={moveToUploadStage} next={moveToConfirmStage}/>;
            break;
        case Stage.CONFIRM:
            content = <ConfirmStage blob={croppedImageBlob} back={backToCropStage} next={moveToFinishStage}/>;
            break;
        case Stage.FINISH:
            content = <FinishStage restart={moveToUploadStage}/>;
            break;
        default:
            content = <UploadStage next={moveToCropStage} />;
    }

    return (
        <div className={classes.root}>
            { content }
        </div>
    )
};

export default UpdateAvatar