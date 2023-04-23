import { HeaderLinksButton } from "@/Components"
import { HeaderLinksData } from "@/Static/HeaderLinksData"

export const HeaderLinks = (props) => {
    return(
        <ul className="flex gap-12">
            {
                HeaderLinksData.map((links, index) =>
                    <HeaderLinksButton key={index} name={HeaderLinksData[index].name} url={HeaderLinksData[index].urlLinks}/>
                )
            }
        </ul>
    )
}