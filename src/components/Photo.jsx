
const Photo = ({ photo }) => {
    console.log(photo)
    return (
        <div>
            <h2>XDD</h2>
            <img src={photo.url} alt="" />
        </div>
    )
}

export default Photo