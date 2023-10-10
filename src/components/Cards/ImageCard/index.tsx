import { ImageViewerModal } from "../../../components/"

const index = ({ src = "https://source.unsplash.com/random" }: { src: string }) => {
    return (
        <label htmlFor="show-modal" className="cursor-pointer">
            <img
                className="h-28 w-28 md:h-64 md:w-64 bg-cover rounded-md"
                src={src}
                alt="profileImg"
            />
            <ImageViewerModal
                src={src}
            />
        </label>
    )
}

export default index