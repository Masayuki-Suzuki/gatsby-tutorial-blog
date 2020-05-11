import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import _ from 'lodash'
import '~/styles/header.sass'

type HeaderProps = {
    siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a href="#" className="navbar-brand">{ siteTitle }</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="blog/page/1" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item dropdown">
                    <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        data-haspopup="true"
                        data-expanded="false"
                    >
                        Categories
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <StaticQuery query={graphql`
                                query CategoryQuery {
                                    allMarkdownRemark(limit: 2000) {
                                        group(field: frontmatter___tags) {
                                            fieldValue
                                        }
                                    }
                                }
                            `}
                             render={data =>{
                                 return data.allMarkdownRemark.group.map(g => (
                                     <Link to={`tags/${g.filedValue}`} className="dropdown-item">
                                         { _.capitalize(g.filedValue)}
                                     </Link>
                                 ))
                             }}
                        />
                    </div>
                </li>
            </ul>
        </div>
    </nav>
)

Header.defaultProps = {
    siteTitle: ``
}

export default Header
