import React from 'react'
import Layout from '~/components/layout'
import _ from 'lodash'
import { graphql } from 'gatsby'
import { AllMarkdownRemark } from './blog-list-template'

type TagsProps = {
    pageContext: {
        tag: string
    }
    data: {
        allMarkdownRemark: AllMarkdownRemark
    }
}

const Tags = ({pageContext: {tag}, data}: TagsProps): JSX.Element => {
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${totalCount > 1 ? 's' : ''} tagged with "${_.capitalize(tag)}`

    return (
        <Layout>
            {edges.map(({node}) => {
                const {slug} = node.fields
                const {title, date} = node.frontmatter
                return (
                    <div key={slug}>
                        <h1>{title}</h1>
                        <time>Date Posted: {date}</time>
                        <div dangerouslySetInnerHTML={{__html: node.html}}></div>
                    </div>
                )
            })}
        </Layout>
    )
}

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
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
        }
    }
`

export default Tags
