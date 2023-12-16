export default function BubbleText({ title }) {
    return <>
        <div className="text">
            {title.split("").map((letter) => {
                return <div className="wrapper">
                    <div className="letter">{letter}</div>
                    <div className="shadow">{letter}</div>
                </div>
            })}
        </div>
    </>
}