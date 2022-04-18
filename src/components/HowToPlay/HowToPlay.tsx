import React, { Component, CSSProperties } from "react"
import * as FontAwesome from "react-icons/fa"
import { Button } from "reactstrap"
import data from "./htp.json"
import Section from "./Section"

interface ISectionData {
    title: string
    contents?: string[]
    children?: ISectionData[]
}

interface IHTPProps {
    goBack: () => void
}
interface IHTPState {
    displayButton: boolean
    sections: ISectionData[]
}

export default class HowToPlay extends Component<IHTPProps, IHTPState> {
    constructor(props: IHTPProps) {
        super(props)
        this.state = {
            displayButton: false,
            sections: data as any,
        }
        this.handleScroll = this.handleScroll.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    public componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    public componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }
    public render(): JSX.Element {
        const bttBtnStyles: CSSProperties = {
            bottom: "20px",
            display: this.state.displayButton ? "initial" : "none",
            position: "fixed",
            right: "30px",
            zIndex: 99,
        }

        console.log(typeof this.state.sections.map)
        const tableOfContents = this.generateTableOfContents(this.state.sections)
        const sectionTree = this.generateSectionTree(this.state.sections)
        return (
            <div
                style={{
                    backgroundColor: "lightGrey",
                    borderRadius: "10px",
                    margin: "20px",
                    padding: "20px",
                }}
            >
                <h1 className="text-center">How to Play</h1>
                <Button color="primary" onClick={this.props.goBack}>
                    <FontAwesome.FaLongArrowAltLeft fontSize="1.5em" /> Back
                </Button>
                <h2>Table of Contents</h2>
                {tableOfContents}

                {sectionTree}
                <Button color="primary" style={bttBtnStyles} onClick={this.handleButtonClick}>
                    Back to top
                </Button>
            </div>
        )
    }
    private generateTableOfContents(root: ISectionData[], level = 1): JSX.Element {
        return (
            <ul style={{ listStyleType: "none" }}>
                {root.map(({ title, children }, i) => (
                    <li key={i} style={{ marginLeft: "-1.2em" }}>
                        <a href={`#sec${i}-${level}`}>{title}</a>
                        {children && this.generateTableOfContents(children, level + 1)}
                    </li>
                ))}
            </ul>
        )
    }
    private generateSectionTree(root: ISectionData[], level = 1): JSX.Element[] {
        return root.map(({ title, contents, children }, i) => (
            <Section title={title} contents={contents} key={i} level={level} id={`sec${i}-${level}`}>
                {children && this.generateSectionTree(children, level + 1)}
            </Section>
        ))
    }
    private handleScroll(): void {
        if (window.scrollY > 20) {
            this.setState({ displayButton: true })
        } else {
            this.setState({ displayButton: false })
        }
    }
    private handleButtonClick() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
}
