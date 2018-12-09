import React, { Component, Fragment } from "react";
import AppNavbar from "./AppNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  CardDeck,
  Button
} from "reactstrap";
import AlexHeadshot from "../media/alex_stout.jpg";
import TaylorHeadshot from "../media/taylor_misch.jpg";
import GreyHeadshot from "../media/grey_larson.jpg";
import TylerHeadshot from "../media/tyler_reski.jpg";
import SarahHeadshot from "../media/sarah_ericson.jpg";
import StevenHeadshot from "../media/steven_nelson.jpg";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [
        {
          name: "Alex Stout",
          position: "Director & Technical Manager",
          picture: AlexHeadshot,
          bio:
            "I’m a Software Engineering major with an Information Systems minor here at UWEC. I am excited to explore how technology and innovation can improve lives. As Director and Technical Manager, I remove barriers to help our software engineers succeed, plan strategically for the longevity of the organization, and have a bit of fun too.",
          links: {
            email: "mailto:STOUTAB4384@uwec.edu",
            linkedin: "https://www.linkedin.com/in/stoutalex/",
            github: "https://github.com/alex-stout"
          }
        },
        {
          name: "Grey Larson",
          position: "Director of Business Development",
          picture: GreyHeadshot,
          bio:
            "I am a Materials Science and Entrepreneurship student and Eau Claire local with a passion for technology and start - ups. At Clearwater Labs, I manage partner relationships and business model development. My goal is to keep us agile, mission-focused, and forward thinking as we continue to grow and serve the campus and community.",
          links: {
            email: "mailto:LARSONGJ6857@uwec.edu",
            linkedin: "https://www.linkedin.com/in/greylan-larson-15235014a/"
          }
        },
        {
          name: "Taylor Misch",
          picture: TaylorHeadshot,
          position: "Senior Software Engineer",
          bio:
            "My name is Taylor Misch. I’m a Computer Science major at the University of Wisconsin - Eau Claire. Apart from school, I enjoy participating in hackathons as well as playing volleyball and piano. I will be graduating after the Spring 2019 semester and plan to continue my career doing web and software development. Feel free to contact me on LinkedIn.",
          links: {
            email: "mailto:MISCHTC6733@uwec.edu",
            linkedin: "https://www.linkedin.com/in/tmisch/"
          }
        },
        {
          name: "Steven Nelson",
          picture: StevenHeadshot,
          position: "Director & Technical Manager",
          bio:
            "I am a software developer at Clearwater Labs and a senior software engineering major at UW-Eau Claire. Previously, I worked at The Toro Company as an Information Services Intern. In my spare time I enjoy going to concerts and being outdoors",
          links: {
            email: "mailto:NELSONSJ6220@uwec.edu",
            linkedin: "https://www.linkedin.com/in/nelsonstevenj/"
          }
        },
        {
          name: "Sarah Ericson",
          picture: SarahHeadshot,
          position: "Junior Software Engineer",
          bio:
            "I am a junior at UWEC with a major in Computer Science – Software Engineering and a minor in Mathematics. My areas of specialization are machine learning and app development. In my free time, she enjoys running, climbing, traveling, being outside, and learning Swedish.",
          links: { email: "mailto:ERICSOSM5070@uwec.edu" }
        },
        {
          name: "Tyler Reski",
          picture: TylerHeadshot,
          position: "Junior Software Engineer",
          bio:
            "My name is Tyler Reski! I’m currently majoring in Software Engineering and minoring in Information Systems at the University of Wisconsin - Eau Claire.When I’m not in class, you can find me in the Blugold Makerspace where I enjoy tinkering with various side projects like 3D printers and Arduino machines.I will be graduating in the spring of 2020 and I look forward to furthering my career as a software engineer.",
          links: {
            email: "mailto:RESKITM2614@uwec.edu",
            linkedin: "https://www.linkedin.com/in/tylerreski/"
          }
        }
      ]
    };
  }

  renderBios(people) {
    return (
      <Fragment>
        {people.map((person, i) => (
          <Card key={i}>
            <CardImg top src={person.picture} alt={person.name} />
            <CardBody>
              <CardTitle>{person.name}</CardTitle>
              <CardSubtitle>{person.position}</CardSubtitle>
              <CardText>{person.bio}</CardText>
            </CardBody>
            <CardFooter>
              {person.links.email ? (
                <a href={person.links.email}>
                  <Button id="icons">
                    <FontAwesomeIcon icon="envelope" size="lg" />
                  </Button>
                </a>
              ) : (
                <Fragment />
              )}
              {person.links.linkedin ? (
                <a href={person.links.linkedin}>
                  <Button id="icons">
                    <FontAwesomeIcon icon={["fab", "linkedin"]} size="lg" />
                  </Button>
                </a>
              ) : (
                <Fragment />
              )}
              {person.links.github ? (
                <a href={person.links.github}>
                  <Button id="icons">
                    <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
                  </Button>
                </a>
              ) : (
                <Fragment />
              )}
            </CardFooter>
          </Card>
        ))}
      </Fragment>
    );
  }
  render() {
    return (
      <div className="navbar-offset">
        <AppNavbar />
        <div className="content">
          <img
            src={require("../media/clearwater_logo.png")}
            className="img-responsive"
            id="cwlLogo"
            alt="cwlLogo"
          />
        </div>
        <div className="container">
          <h4>
            <em>"Improving students' lives through innovative technology"</em>
          </h4>
          <p>
            Clearwater Labs is a 100% student managed software incubator with
            the goal to provide quality products and high impact experiences.
            The mission of the organization is "Improving students'​ lives
            through innovative technology"​
          </p>
          <p>
            Founded in 2018, we are located on the UWEC campus in Schofield. We
            work with the latest and greatest technology to deploy simplified
            yet effective solutions.
          </p>
          <h4>The Team</h4>
        </div>
        <CardDeck>{this.renderBios(this.state.employees.slice(0, 2))}</CardDeck>
        <CardDeck>{this.renderBios(this.state.employees.slice(2, 4))}</CardDeck>
        <CardDeck>{this.renderBios(this.state.employees.slice(4, 6))}</CardDeck>
      </div>
    );
  }
}

export default About;
