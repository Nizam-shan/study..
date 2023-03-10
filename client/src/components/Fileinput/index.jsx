import storage from "../../FirebaseFile";
import Screenshot from '../../Screenshot (1).png';
import { useRef,useState } from "react";

import {ref , uploadBytesResumable,getDownloadURL} from 'firebase/storage';
// import storage from "../../FirebaseFile";
// import Screenshot from '../../Screenshot (1).png';
import styles from './Styles.module.css';

const FileInput = ({name,label,value,type,handleInputState,...rest}) => {
    const inputRef = useRef();
    const [progress , setProgress] = useState(0);
    const [progressShow,setProgressShow] = useState(false);
    const handleUpload = () => {
        setProgressShow(true)
        const fileName = new Date().getDate() + value.name;
        const storageRef = ref(
            storage,
            type === "audio" ? `/audio/${fileName}`: `/images/${fileName}`
        );
        const uploadTask = uploadBytesResumable(storageRef,value);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploaded = Math.floor(
                    (snapshot.bytesTransferred/snapshot.totalBytes) *100
                );
                setProgress(uploaded)
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    handleInputState(name,url)
                })
            }
        )
    }

    return (
        <div className={styles.container}>
            <input 
            type={type}
            ref={inputRef}
            onChange={(e) => handleInputState(name,e.currentTarget.files[0])}
            value={name}
            className={styles.input}
            {...rest}
            />
            <button
            type="button"
            onClick={() => inputRef.current.click()}
            className={styles.button}
            >{label}</button>
            {type === "image" && value && (
                <img 
                src={typeof value === "string" ? value:URL.createObjectURL(value)}
                alt="file"
                className={styles.preview_img}
                />
            )}
            {type === "audio" && value && (
                <audio 
                src={typeof value === "string" ? value:URL.createObjectURL(value)}
                controls
                />
            )}
            {value !=null && !progressShow && typeof value !== "string" && (
                <button onClick={handleUpload} className={styles.button}>
                    Upload
                </button>
            )}

            {progressShow && progress < 100 && (
                <div className={styles.progress_container}>
                    <p>{progress}%</p>
                </div>
            )}

            { progress === 100 && (
                <div className={styles.progress_container}>
                   <img 
                   src={Screenshot}
                   alt="check prog"
                   className = {styles.check_img}
                   />
                </div>
            )}

        </div>
    )
};

export default FileInput;