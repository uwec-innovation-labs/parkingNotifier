import React, { Component, Fragment } from "react";
import AppNavbar from "./AppNavbar";
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
import StevenHeadshot from "../media/steven_nelson.jpg";
import KatieHeadshot from "../media/katie_reiter.jpg";
import BrandonHeadshot from "../media/brandon_pessman.jpg";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [
        {
          name: "Alex Stout",
          position: "Founder & Director of Operations",
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
          position: "Founder & Director of Business Development",
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
            linkedin: "https://www.linkedin.com/in/tmisch/",
            github: "https://github.com/taylor-misch"
          }
        },
        {
          name: "Katherine Reiter",
          picture: KatieHeadshot,
          position: "Senior Software Engineer",
          bio:
            "I'm studying Computer Science at UWEC. I also read books, make games, and go for walks until I get lost. I like to solve problems, and I'm excited to make university life a little easier for everyone here.",
          links: {
            email: "mailto:NELSONSJ6220@uwec.edu",
            linkedin: "https://www.linkedin.com/in/nelsonstevenj/",
            github: "https://github.com/katherine-reiter"
          }
        },
        {
          name: "Steven Nelson",
          picture: StevenHeadshot,
          position: "Senior Software Engineer",
          bio:
            "I am a software developer at Clearwater Labs and a senior software engineering major at UW-Eau Claire. Previously, I worked at The Toro Company as an Information Services Intern. In my spare time I enjoy going to concerts and being outdoors",
          links: {
            email: "mailto:NELSONSJ6220@uwec.edu",
            linkedin: "https://www.linkedin.com/in/nelsonstevenj/",
            github: "https://github.com/StevenJNelson"
          }
        },
        {
          name: "Tyler Reski",
          picture: TylerHeadshot,
          position: "Junior Software Engineer",
          bio:
            "My name is Tyler Reski! I’m currently majoring in Software Engineering and minoring in Information Systems at the University of Wisconsin - Eau Claire.When I’m not in class, you can find me in the Blugold Makerspace where I enjoy tinkering with various side projects like 3D printers and Arduino machines.I will be graduating in the spring of 2020 and I look forward to furthering my career as a software engineer.",
          links: {
            email: "mailto:RESKITM2614@uwec.edu",
            linkedin: "https://www.linkedin.com/in/tylerreski/",
            github: "https://github.com/treski"
          }
        },
        {
          name: "Brandon Pessman",
          picture: BrandonHeadshot,
          position: "Sophomore Software Engineer",
          bio:
            "I'm currently studying Computer Science at the University of Wisconsin - Eau Claire. I have a strong passion for learning and creating innovative technology. When I am not studying or working, I enjoy playing and designing board games with my friends and watching terribly written movies.",
          links: {
            email: "mailto:pessmabm5831@uwec.edu",
            linkedin: "https://www.linkedin.com/in/brandonpessman/",
            github: "https://github.com/BrandonPessman"
          }
        }
      ]
    };
  }

  renderBios(people) {
    return (
      <Fragment>
        {people.map((person, i) => (
          <Card className="mx-auto" key={i}>
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
                    <i className="fas fa-envelope fa-lg" />
                  </Button>
                </a>
              ) : (
                <Fragment />
              )}
              {person.links.linkedin ? (
                <a href={person.links.linkedin}>
                  <Button id="icons">
                    <i className="fab fa-linkedin fa-lg" />
                  </Button>
                </a>
              ) : (
                <Fragment />
              )}
              {person.links.github ? (
                <a href={person.links.github}>
                  <Button id="icons">
                    <i className="fab fa-github fa-lg" />
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
            <em>"Empowering students to innovate."</em>
          </h4>
          <p>
            Clearwater Labs is a 100% student operated software company with the
            goal to provide quality products and high impact experiences. We
            provide services to companies and
          </p>
          <p>
            Founded in 2018, we are located in the collaborative workspace,{` `}
            <a href="https://volumeone.org/articles/2019/01/22/27851_working_together-88395-1">
              CoLAB
            </a>
            , in downtown Eau Claire. We work with the latest and greatest
            technology to deploy simplified yet effective solutions.
          </p>
          <h3>The Team</h3>
        </div>
        <CardDeck>{this.renderBios(this.state.employees.slice(0, 1))}</CardDeck>
        <CardDeck>{this.renderBios(this.state.employees.slice(1, 3))}</CardDeck>
        <CardDeck>{this.renderBios(this.state.employees.slice(3, 5))}</CardDeck>
        <CardDeck>{this.renderBios(this.state.employees.slice(5, 7))}</CardDeck>
      </div>
    );
  }
}

export default About;
