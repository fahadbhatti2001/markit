export const HeaderLinksButton = (props) => {
    return(
        <li className="font-PoppinsRegular text-base transition-all hover:text-primary-0">
            <a href={props.url}>{props.name}</a>
        </li>
    )
}