import React from 'react'
import { Link } from 'gatsby'
import Layout from '~/components/layout'

type BlogListState = {
    pageNumArray: number[]
}

type BlogListProps = {
    data: BlogListData
    location: {
        pathname: string
    }
}

type BlogListData = {
    allMarkdownRemark: AllMarkdownRemark
}

export type AllMarkdownRemark = {
    totalCount: number
    pageInfo: { perPage: number }
    edges: BlogPostEdge[]
}

type BlogPostEdge = {
    node: BlogPostNode
}

type BlogPostNode = {
    frontmatter: Frontmatter
    fields: Fields
    html: string
}

type Frontmatter = {
    title: string
    date: string
}

type Fields = {
    slug: string
}

const getPostsElement = (): JSX.Element[] => (
    this.props.data.allMarkdownRemark.edges.map(({node}) => {
        const title = node.frontmatter.title ?? node.fields.slug
        return (
            <div key={node.fields.slug}>
                <h1>{title}</h1>
                <time>Date Posted: {node.frontmatter.date}</time>
                <div dangerouslySetInnerHTML={{__html: node.html}}></div>
            </div>
        )
    })
)

export default class BlogList extends React.Component<BlogListProps, BlogListState> {
    constructor(props: BlogListProps) {
        super(props)
        this.state = { pageNumArray: [1]}
    }

    componentDidMount(): void {
        this.setPageArray()
    }

    componentWillReceiveProps(): void {
        this.setPageArray()
    }

    setPageArray(): void {
        const {allMarkdownRemark} = this.props.data

        const totalCount = allMarkdownRemark.totalCount
        const postsPerPage = allMarkdownRemark.pageInfo.perPage

        let pageNumArray = Array.from(
            { length: Math.ceil(totalCount / postsPerPage ) },
            (v, i) => i + 1
        )
        this.setState({ pageNumArray })
    }

    render(): JSX.Element {
        const pathNames = this.props.location.pathname.split("/")
        const page = pathNames[pathNames.length - 1]

        return (
            <Layout>
                {/* @ts-ignore */}
                { getPostsElement() }
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            this.state.pageNumArray.map(p => (
                                <li className={`page-item ${page === p.toString() ? "active" : ""}`}>
                                    <Link to={`blog/page/${p}`} className="page-link">{p}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </Layout>
        )
    }
}

export const blogListQuery = graphql`
    query blogListQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                    }
                    html
                }
            }
            pageInfo {
                perPage
            }
            totalCount
        }
    }
`
