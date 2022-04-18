import React from "react"

export interface ISectionProps {
    children?: any
    contents?: string[]
    level: number
    id: string
    title: string
}
const Section = (props: ISectionProps) => {
    const tags: ("h1" | "h2" | "h3" | "h4" | "h5" | "h6")[] = ["h1", "h2", "h3", "h4", "h5", "h6"]
    const level = props.level < 6 ? (props.level > 0 ? props.level : 1) : 6
    const TitleTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = tags[level]
    return (
        <div>
            <TitleTag id={props.id}>{props.title}</TitleTag>
            {props.contents && (
                <ul>
                    {props.contents.map((content, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: content }} />
                    ))}
                </ul>
            )}
            {props.children}
        </div>
    )
}

export default Section
