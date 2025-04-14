import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, onChange }) {

    const [photoLink, setPhotoLink] = useState('');
    async function addPhotoByLink(ev) {
        ev.preventDefault();

        const { data: filename } = await axios.post('/upload', { link: photoLink })
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        ev.preventDefault();
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload-comp', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames]
            });
        })
    }

    function removePhoto(filename) {
        onChange([...addedPhotos.filter(photo => photo !== filename)]);

    }

    function selectMainPhoto(filename) {onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
        
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text"
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link ....jpg'} />
                <button className="bg-primary px-8 rounded-full" onClick={addPhotoByLink}>Add&nbsp;photo</button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div key={link} className="flex h-35 relative">
                        <img className="px-2 rounded-3xl  w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                        <button onClick={(ev) => {
                            ev.preventDefault();
                            removePhoto(link)}} className="absolute bottom-2 right-3 text-white cursor-pointer bg-black bg-opacity-50 rounded-full p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>

                        </button >
                        <button onClick={(ev) => {
                            ev.preventDefault();
                            selectMainPhoto(link)}
                            } 
                            className="absolute bottom-2 left-3 text-white cursor-pointer bg-black bg-opacity-50 rounded-full p-1.5">
                            {link === addedPhotos[0] && (

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="size-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>
                            )}
                            {link !== addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                              </svg>
                              
                            )}


                        </button >
                    </div>
                ))}
                <label className="cursor-pointer flex justify-around border bg-transparent rounded-3xl p-8 text-2xl text-gray-600 items-center">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>

                    Upload</label>
            </div>
        </>
    )
}