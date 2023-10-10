const ImageViewerModal = ({ src }: { src: string }) => {
    return (
        <>
            <button className="btn hidden" id="show-modal" onClick={() => {
                const myModal: HTMLDialogElement | null = document.getElementById('my_modal_2') as HTMLDialogElement;
                myModal.showModal()

            }}>open modal</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            <img src={src} alt='image' />
                            <button className="btn btn-secondary mt-2">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}

export default ImageViewerModal