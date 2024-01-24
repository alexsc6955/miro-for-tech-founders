import "./assets/style.css";
import Paradox from "penrose-paradox/build/index";

function Layout(props) {
  const { currentPage } = props;
  return {
    tag: "div",
    options: {
      classList: "centered",
      children: Array.isArray(currentPage) ? currentPage : [currentPage]
    }
  }
}

function Initial(props) {
  const { setPage } = props;
  function handleButtonClick(ev) {
    ev.preventDefault();
    setPage(FormLayout({ currentForm: ValueProposition() }));
  }

  return [
    {
      tag: "h1",
      options: {
        text: "Welcome to the Miro for Tech Founders Wizard!",
        style: {
          textAlign: "center",
          maxWidth: "75%",
          margin: "0 auto",
          marginBottom: "1rem"
        }
      }
    },
    {
      tag: "p",
      options: {
        text: "This wizard will help you create your Business Model Canvas.",
        style: {
          textAlign: "center",
          maxWidth: "75%",
          margin: "0 auto",
          marginBottom: "1rem"
        }
      }
    },
    {
      tag: "button",
      options: {
        text: "Start",
        classList: "button-primary",
        style: {
          maxWidth: "75%",
          width: "100%",
          margin: "0 auto",
          padding: "1rem",
          borderWidth: "0",
          borderRadius: "0.5rem",
          cursor: "pointer"
        },
        events: {
          click: handleButtonClick
        }
      }
    }
  ]
}

function FormLayout(props) {
  const { currentForm } = props;
  return {
    tag: "div",
    options: {
      classList: "centered",
      children: [
        // progress bar
        {
          tag: "div",
          options: {
            style: {
              width: "100%",
              height: "1rem",
              backgroundColor: "#ccc",
              borderRadius: "0.5rem"
            },
            children: [
              {
                tag: "div",
                options: {
                  style: {
                    width: "25%",
                    height: "100%",
                    backgroundColor: "#00f",
                    borderRadius: "0.5rem"
                  }
                }
              }
            ]
          }
        },
        // form
        currentForm,
        // buttons
        {
          tag: "div",
          options: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "75%",
              margin: "0 auto",
              marginTop: "1rem"
            },
            children: [
              {
                tag: "button",
                options: {
                  text: "Back",
                  classList: "button-secondary",
                  style: {
                    padding: "1rem",
                    borderWidth: "0",
                    borderRadius: "0.5rem",
                    cursor: "pointer"
                  }
                }
              },
              {
                tag: "button",
                options: {
                  text: "Next",
                  classList: "button-primary",
                  style: {
                    padding: "1rem",
                    borderWidth: "0",
                    borderRadius: "0.5rem",
                    cursor: "pointer"
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }
}

function ValueProposition(props) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h1",
          options: {
            text: "Value Proposition",
            style: {
              textAlign: "center",
              maxWidth: "75%",
              margin: "0 auto",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "p",
          options: {
            text: "What is your value proposition?",
            style: {
              textAlign: "center",
              maxWidth: "75%",
              margin: "0 auto",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              maxWidth: "75%",
              width: "100%",
              margin: "0 auto",
              marginBottom: "1rem",
              padding: "1rem",
              borderWidth: "0",
              borderRadius: "0.5rem"
            }
          }
        }
      ]
    }
  }
}

function setPage(page) {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(Paradox.buildElement(page.tag, page.options));
}

function init() {
  setPage(Layout({ currentPage: Initial({ setPage }) }));
}

init();