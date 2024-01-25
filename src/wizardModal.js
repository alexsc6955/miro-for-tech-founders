import "./assets/style.css";
import Paradox from "penrose-paradox/build/index";

const { VITE_OPENAI_API_KEY } = import.meta.env;

const forms = {
  valueProposition: ValueProposition,
  customerSegments: CustomerSegments,
  channels: Channels,
  customerRelationship: CustomerRelationship,
  revenueStreams: RevenueStreams,
  keyResources: KeyResources,
  keyActivities: KeyActivities,
  keyPartners: KeyPartners,
  costStructure: CostStructure,
}

const data = {
  valueProposition: "",
  customerSegments: "",
  channels: "",
  customerRelationship: "",
  revenueStreams: "",
  keyResources: "",
  keyActivities: "",
  keyPartners: "",
  costStructure: "",
}

const initialData = {
  valueProposition: "Provide a simple and easy to use tool for tech founders to create their business model canvas and business plan in less than 5 minutes.",
  customerSegments: "Tech founders, entrepreneurs, startups.",
  channels: "Miro board",
  customerRelationship: "Social media, github, email, miro community",
  revenueStreams: "Donations",
  keyResources: "Miro board, github",
  keyActivities: "Development, marketing",
  keyPartners: "Miro",
  costStructure: "Development, marketing, server",
}

function Spinner(props = {}) {
  console.log(data);
  return {
    tag: "div",
    options: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      children: [
        {
          tag: "div",
          options: {
            style: {
              width: "3rem",
              height: "3rem",
              borderWidth: "0.5rem",
              borderStyle: "solid",
              borderColor: "#ccc",
              borderRadius: "50%",
              borderTopColor: "#00f",
              animation: "spin 1s linear infinite"
            }
          }
        }
      ]
    }
  }
}

function Layout(props = {}) {
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
  const { render } = props;
  function handleButtonClick(ev) {
    ev.preventDefault();
    render(
      {
        currentPage: FormLayout,
        currentForm: "valueProposition"
      }
    );
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

function ProgressBar(props) {
  const { progress } = props;
  return {
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
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#00f",
              borderRadius: "0.5rem"
            }
          }
        }
      ]
    }
  }
}

function Button(props) {
  const { text, onClick, color = "primary" } = props;
  return {
    tag: "button",
    options: {
      text,
      classList: `button-${color}`,
      style: {
        padding: ".5rem 1rem",
        borderWidth: "0",
        borderRadius: "0.5rem",
        cursor: "pointer"
      },
      events: {
        click: onClick
      }
    }
  }
}

function calculaeProgress(currentForm) {
  const total = Object.keys(forms).length;
  const currentFormInObject = Object.keys(forms).indexOf(currentForm);
  const progress = Math.floor((currentFormInObject / total) * 100);
  return progress;
}

function FormLayout(props = {}) {
  const { currentForm } = props;
  
  const progress = calculaeProgress(currentForm);

  function handleButtonClick(ev) {
    ev.preventDefault();
    let renderSpinner = false;

    const currentFormIndex = Object.keys(forms).indexOf(currentForm);
    const totalForms = Object.keys(forms).length;
    let nextFormIndex = 0; 
    if (currentFormIndex < totalForms - 1) nextFormIndex = currentFormIndex + 1
    else {
      nextFormIndex = 0;
      renderSpinner = true;
    }
    const nextForm = Object.keys(forms)[nextFormIndex];

    const input = document.querySelector("textarea");
    data[currentForm] = input.value;

    if (renderSpinner) {
      render(
        {
          currentPage: Spinner,
        }
      );
      return;
    }

    render(
      {
        currentPage: FormLayout,
        currentForm: nextForm
      }
    );
  }

  function handleBackButtonClick(ev) {
    ev.preventDefault();
    let renderInitial = false;

    const currentFormIndex = Object.keys(forms).indexOf(currentForm);
    const totalForms = Object.keys(forms).length;
    let prevFormIndex = totalForms;
    if (currentFormIndex > 0) prevFormIndex = currentFormIndex - 1
    else {
      prevFormIndex = totalForms - 1;
      renderInitial = true;
    }

    if (renderInitial) {
      render(
        {
          currentPage: Initial
        }
      );
      return;
    }

    const prevForm = Object.keys(forms)[prevFormIndex];
    render(
      {
        currentPage: FormLayout,
        currentForm: prevForm
      }
    );
  }

  return [
    // progress bar
    ProgressBar({ progress }),
    // form
    {
      tag: "div",
      options: {
        style: {
          width: "100%",
          margin: "0 auto",
          padding: "1rem",
        },
        children: [
          forms[currentForm]()
        ]
      }
    },
    // buttons
    {
      tag: "div",
      options: {
        style: {
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "100%",
        },
        children: [
          Button({
            text: "Back",
            color: "secondary",
            onClick: handleBackButtonClick
          }),
          {
            tag: "div",
            options: {
              style: {
                padding: "0 .5rem"
              }
            }
          },
          Button({
            text: "Next",
            onClick: handleButtonClick
          })
        ]
      }
    }
  ]
}

function ValueProposition(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Value Proposition",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "What problem does your product solve, and how does it uniquely create value for customers compared to existing alternatives?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your value proposition here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.valueProposition
          }
        }
      ]
    }
  }
}

function CustomerSegments(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Customer Segments",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "Describe your target customers and their demographics. Are there priority segments, and how do you plan to reach and engage them?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your customer segments here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.customerSegments
          }
        }
      ]
    }
  }
}

function Channels(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Channels",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "How will you deliver your product/service to customers, and what are your plans for promoting and selling it?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your channels here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.channels
          }
        }
      ]
    }
  }
}

function CustomerRelationship(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Customer Relationship",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "What type of customer relationships do you seek, and how do you plan to maintain and enhance them over time?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your customer relationship here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.customerRelationship
          }
        }
      ]
    }
  }
}

function RevenueStreams(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Revenue Streams",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "What's your pricing strategy, including tiers for different customer segments, and how do you plan to generate revenue from your product/service?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your revenue streams here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.revenueStreams
          }
        }
      ]
    }
  }
}

function KeyResources(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Key Resources",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "What critical assets and resources does your business need for success, and are there key partnerships or collaborations to enhance your capabilities?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your key resources here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.keyResources
          }
        }
      ]
    }
  }
}

function KeyActivities(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Key Activities",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "What are the key activities necessary to deliver your value proposition, and are there unique activities providing a competitive advantage?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your key activities here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.keyActivities
          }
        }
      ]
    }
  }
}

function KeyPartners(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Key Partners",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "Are external partners crucial for your business success, and how do these partnerships contribute to your overall business model?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your key partners here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.keyPartners
          }
        }
      ]
    }
  }
}

function CostStructure(props = {}) {
  return {
    tag: "div",
    options: {
      children: [
        {
          tag: "h2",
          options: {
            text: "Cost Structure",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "small",
          options: {
            text: "What are the major costs associated with running your business, and are there specific areas with expected higher investment or ongoing expenses?",
            style: {
              textAlign: "center",
              marginBottom: "1rem"
            }
          }
        },
        {
          tag: "textarea",
          options: {
            style: {
              marginTop: "1rem",
            },
            classList: "textarea",
            attributes: {
              placeholder: "Enter your cost structure here...",
              rows: "4",
              resize: "true"
            },
            text: initialData.costStructure
          }
        }
      ]
    }
  }
}

function render({ currentPage, currentForm = null }) {
  const root = document.getElementById("root");
  root.innerHTML = "";
  const page = Layout({ currentPage: currentPage({ render, currentForm }) });
  root.appendChild(Paradox.buildElement(page.tag, page.options));
}

function init() {
  render({
    currentPage: Initial
  });
}

init();