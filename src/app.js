import "./assets/style.css";
import Paradox from "penrose-paradox/build/index";
// import { canvasSize } from "./constants";

function Layout(props = {}) {
  const { title =  "", content = [], buttons = [] } = props;
  return {
    tag: "div",
    options: {
      classList: "grid wrapper",
      children: [
        {
          tag: "div",
          options: {
            classList: "cs1 ce12",
            children: [
              {
                tag: "h1",
                options: {
                  text: title,
                }
              },
              {
                tag: "div",
                options: {
                  children: content,
                }
              }
            ]
          }
        },
        {
          tag: "div",
          options: {
            classList: "cs1 ce12",
            style: {
              display: "flex",
              flexDirection: "column",
            },
            children: buttons,
          }
        }
      ]
    }
  }
}

function Home() {
  const title = "Miro for Tech Founders";
  const content = [
    {
      tag: "p",
      options: {
        text: "With AI integration, tech founders can quickly create a business model canvas and plan within five minutes using Miro boards.",
      }
    },
    {
      tag: "p",
      options: {
        text: "Please click the button below to give your AI assistant information about your business idea.",
      }
    },
  ];
  const buttons = [
    {
      tag: "button",
      options: {
        text: "Run Wizard",
        classList: "button button-primary",
        events: {
          click: async () => {
            if (await miro.board.ui.canOpenModal()) {
              await miro.board.ui.openModal({
                url: 'views/wizard-modal.html',
                width: 600,
                height: 400,
                fullscreen: false,
              });

              await miro.board.ui.closePanel();
            }
          }
        }
      }
    }
  ];

  const page = Layout({ title, content, buttons });
  return [page.tag, page.options];
}

const root = document.getElementById("root");
function render() {
  root.innerHTML = "";
  const [tag, options] = Home();
  const element = Paradox.buildElement(tag, options);
  root.appendChild(element);
}

render();

function buildCanvas(containerId) {
  console.log(containerId);
  // get data from the collection

  // use data to build the canvas

  // Re render the page with different options
}

const mtfCollection = miro.board.storage.collection('mtf');
const checkCollection = setInterval(async () => {
  const containerId = await mtfCollection.get("mtf:canvas:container_id");
  if (containerId) {
    clearInterval(checkCollection);
    buildCanvas(containerId);
    // remove the container id from the collection
  }
}, 500);
// const API_URL = "http://localhost:8000/api";
  
// const canvasSize = {
//   width: 6000,
//   height: 3375,
// }

// async function start() {
//   const stickiesCollection = miro.board.storage.collection('stickies');
//   const restartButton = document.getElementById("restartButton");
//   async function restart() {
//     await stickiesCollection.set("data", null);
//     const items = await miro.board.get();
//     for (let i = 0; i < items.length; i++) {
//       const item = items[i];
//       await miro.board.remove(item)
//     }
//     addCanvas();
//   }
//   function stripHtmlTags(str) {
//     if ((str===null) || (str===''))
//         return false;
//     else
//         str = str.toString();
//     return str.replace(/<[^>]*>/g, '');
//   }
//   const appButton = document.getElementById("appButton");
//   async function createDocument(ev) {
//     ev.preventDefault();
//     const allGroupedItems = JSON.parse(await stickiesCollection.get("data"));
//     console.log(allGroupedItems);
//     try {
//       const data = {
//         keyPartners: [],
//         keyActivities: [],
//         keyResources: [],
//         customerSegments: [],
//         customerRelationship: [],
//         channels: [],
//         valueProposition: [],
//         costStructure: [],
//         revenueStreams: [],
//       }
//       const positions = {}
//       Object.keys(data).forEach((positionKey) => {
//         const currentItem = allGroupedItems.find((groupedItem) => groupedItem.key === positionKey);
//         positions[positionKey] = {
//           x: currentItem.item.x,
//           y: currentItem.item.y,
//           width: currentItem.item.width,
//           height: currentItem.item.height,
//         }
//       })
//       console.log(positions);
//       const items = await miro.board.get({
//         type: "sticky_note",
//       });
//       items.forEach((item, i) => {
//         const itemPosition = {
//           x: item.x,
//           y: item.y,
//           width: item.width,
//           height: item.height,
//         }
//         // check if item is in any of the positions
//         Object.keys(positions).forEach((positionKey) => {
//           const position = positions[positionKey];
//           if (
//             itemPosition.x >= position.x - position.width / 2 &&
//             itemPosition.x <= position.x + position.width / 2 &&
//             itemPosition.y >= position.y - position.height / 2 &&
//             itemPosition.y <= position.y + position.height / 2
//           ) {
//             data[positionKey].push(stripHtmlTags(item.content));
//           }
//         })
//       })
//       console.log(data);
//       ev.target.innerHTML = "Creating document...";
//       const response = await fetch(`${API_URL}/documents`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           data: data,
//         }),
//       });
//       const json = await response.json();
//       const { data: { file } } = json;
//       ev.target.innerHTML = "Create a business model document";
//       window.open(file, "_blank");
//     } catch (error) {
//       console.error(error);
//       ev.target.innerHTML = "Create a business model document";
//     }
//   }
//   restartButton.addEventListener("click", restart);
//   const contentElement = document.getElementById("content");
//   async function generateBusinessModelDocument() {
//     contentElement.innerHTML = contents.nexStep;
//     restartButton.style.display = "block";
//     appButton.innerHTML = "Create a business model document";
  
//     appButton.addEventListener("click", createDocument);
//   }

//   async function addCanvas() {
//     contentElement.innerHTML = contents.initial;
//     restartButton.style.display = "none";
//     appButton.innerHTML = "Go to Business Model Canvas";
//     appButton.removeEventListener("click", createDocument);
//     await stickiesCollection.set("test", "test  BBBBB");
//     async function buildCanvas(data) {
//       const dataOrder = [
//         "keyPartners",
//         "keyActivities",
//         "keyResources",
//         "customerSegments",
//         "customerRelationship",
//         "channels",
//         "valueProposition",
//         "costStructure",
//         "revenueStreams",
//       ]
  
//       // sort data based on dataOrder and remove what is not in dataOrder
//       const sortedData = dataOrder.reduce((acc, key) => {
//         if (data[key]) {
//           acc[key] = data[key];
//         }
//         return acc;
//       }, {});
  
//       console.log(sortedData);
    
//       async function buildItem(type = "top-small", position = "top-left", options = {}) {
//         const types = {
//           "top-small": {
//             width: canvasSize.width / 5,
//             height: canvasSize.height / 3,
//           },
//           "top-large": {
//             width: canvasSize.width / 5,
//             height: canvasSize.height / 3 * 2,
//           },
//           "bottom-large": {
//             width: canvasSize.width / 2,
//             height: canvasSize.height / 3,
//           },
//         }
    
//         function calculatePosition(positionType = "top-large") {
//           const positions = {
//             "top-left": {
//               x: - canvasSize.width / 2 + types[type].width / 2,
//               y: - canvasSize.height / 2 + types[type].height / 2,
//             },
//             "top-middle-left": {
//               x: - canvasSize.width / 2 + types[type].width / 2 + types[type].width,
//               y: - canvasSize.height / 2 + types[type].height / 2,
//             },
//             "bottom-middle-left": {
//               x: - canvasSize.width / 2 + types[type].width / 2 + types[type].width,
//               y: - canvasSize.height / 2 + types[type].height / 2 + types[type].height,
//             },
//             "top-center": {
//               x: 0,
//               y: - canvasSize.height / 2 + types[type].height / 2,
//             },
//             "top-middle-right": {
//               x: canvasSize.width / 2 - types[type].width / 2 - types[type].width,
//               y: - canvasSize.height / 2 + types[type].height / 2,
//             },
//             "bottom-middle-right": {
//               x: canvasSize.width / 2 - types[type].width / 2 - types[type].width,
//               y: - canvasSize.height / 2 + types[type].height / 2 + types[type].height,
//             },
//             "top-right": {
//               x: canvasSize.width / 2 - types[type].width / 2,
//               y: - canvasSize.height / 2 + types[type].height / 2,
//             },
//             "bottom-left": {
//               x: - canvasSize.width / 2 + types[type].width / 2,
//               y: canvasSize.height / 2 - types[type].height / 2,
//             },
//             "bottom-right": {
//               x: canvasSize.width / 2 - types[type].width / 2,
//               y: canvasSize.height / 2 - types[type].height / 2,
//             },
//           }
//           return positions[positionType]
//         }
    
//         const calculatedPosition = calculatePosition(position)
  
//         const { fillColor = "#d3d3d3", textAlignVertical = "top", fontSize = 144, borderOpacity = .3 } = options;
    
//         return miro.board.createShape({
//           content: options.content || "",
//           width: types[type].width,
//           height: types[type].height,
//           x: calculatedPosition.x,
//           y: calculatedPosition.y,
//           style: {
//             fillColor: fillColor,
//             textAlignVertical: textAlignVertical,
//             fontSize: fontSize,
//             borderOpacity: borderOpacity,
//           }
//         })
//       }
      
//       const shape = await miro.board.createShape({
//         content: "Your Business Model Canvas",
//         shape: 'round_rectangle',
//         width: canvasSize.width + 1000,
//         height: canvasSize.height + 1000,
//         style: {
//           fillColor: "#fefefe",
//           textAlignVertical: "top",
//           fontSize: 144
//         }
//       })
  
//       await miro.board.viewport.zoomTo(shape)
    
//       const keyPartners = await buildItem("top-large", "top-left", {
//         content: "Key Partners",
//       })
    
//       const keyActivities = await buildItem("top-small", "top-middle-left", {
//         content: "Key Activities",
//       })
    
//       const keyResources = await buildItem("top-small", "bottom-middle-left", {
//         content: "Key Resources",
//       })
    
//       const customerSegments = await buildItem("top-large", "top-right", {
//         content: "Customer Segments",
//       })
    
//       const customerRelationship = await buildItem("top-small", "top-middle-right", {
//         content: "Customer Relationship",
//       })
    
//       const channels = await buildItem("top-small", "bottom-middle-right", {
//         content: "Channels",
//       })
    
//       const valueProposition = await buildItem("top-large", "top-center", {
//         content: "Value Proposition",
//       })
    
//       const costStructure = await buildItem("bottom-large", "bottom-left", {
//         content: "Cost Structure",
//       })
    
//       const revenueStreams = await buildItem("bottom-large", "bottom-right", {
//         content: "Revenue Streams",
//       })
    
//       const items = [keyPartners, keyActivities, keyResources, customerSegments, customerRelationship, channels, valueProposition, costStructure, revenueStreams]
    
//       const canvasGroup = await miro.board.group({items})
    
//       const groupedItems = await canvasGroup.getItems();
      
//       // currentIterationCache for y value
//       let currentIterationCache = 0
//       async function buildStickyItem(item, content, count) {
//         if (count === 0) currentIterationCache = 0;
//         console.log(item);
//         const sticky = await miro.board.createStickyNote({
//           content,
//         })
//         const y = currentIterationCache === 0
//           ? item.y - sticky.height * 1.5
//           : currentIterationCache + sticky.height * 1.5
//         sticky.x = item.x - sticky.width / 2
//         sticky.y = y
//         await sticky.sync()
//         currentIterationCache = sticky.y
//         return sticky
//       }
      
//       const allGroupedItems = [];
//       for (let i = 0; i < groupedItems.length; i++) {
//         const item = groupedItems[i]
//         const dataKey = Object.keys(sortedData)[i]
//         const dataValue = sortedData[dataKey]
//         console.log(i, item, dataKey, dataValue);
//         const stickies = [];
//         for (let j = 0; j < dataValue.length; j++) {
//           const content = dataValue[j]
//           const sticky = await buildStickyItem(item, content, j);
//           stickies.push(sticky);
//         }
//         allGroupedItems.push({
//           key: dataKey,
//           item,
//           stickies,
//         })

//         console.log(allGroupedItems);
//       }
  
//       await stickiesCollection.set("data", JSON.stringify(allGroupedItems));
//       generateBusinessModelDocument();
//     }
  
//     async function getTextStatus(textId) {
//       try {
//         const response = await fetch(`${API_URL}/texts/${textId}`);
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error(error);
//         return "error";
//       }
//     }
  
//     function getTextFromBoard() {
//       const interval = setInterval(async () => {
//         const items = await miro.board.get();
//         let text = null;
//         items.forEach(item => {
//           if (item.type === "text") {
//             text = item;
//           }
//         })
//         if (text) {
//           const { status, data = null } = await getTextStatus(text.id);
//           console.log(status, data);
//           if (status === "completed" && data) {
//             setTimeout(() => {
//               buildCanvas(data);
//             }, 1000)
//             clearInterval(interval);
//           }
//         }
//       }, 500)
//     }
    
//     const InitialText = await miro.board.createText({
//       content: `<p>Please don't close the panel yet. <br/>Take the time to read the instructions and follow them.</p>`,
//       style: {
//         color: "#1a1a1a", // Default value: "#1a1a1a" (black)
//         fillColor: "transparent", // Default value: transparent (no fill)
//         fillOpacity: 1, // Default value: 1 (solid color)
//         fontFamily: "arial", // Default font type for the text
//         fontSize: 14, // Default font size for the text
//         textAlign: "left", // Default horizontal alignment for the text
//       },
//       x: 0, // Default value: horizontal center of the board
//       y: 0, // Default value: vertical center of the board
//       width: 300,
//       rotation: 0.0,
//     });
//     await miro.board.viewport.zoomTo(InitialText);
//     const response = await fetch(`${API_URL}/texts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         initialTextId: InitialText.id,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     getTextFromBoard();
//   }

//   const contents = {
//     initial: `
//     <h1>Welcome to Miro for Tech Founders</h1>
//     <p>
//       This app uses AI to help you build a business model canvas and a business plan document.
//     </p>
//     <p>
//       Please click the button below to give your AI assistant information about your business.
//     </p>
//     `,
//     nexStep: `
//     <h1>Welcome to Miro for Tech Founders</h1>
//     <p>
//       You can now add or remove sticky notes on the canvas. Please click the button below when you are done.
//     </p>
//     <p>
//       <strong>IMPORTANT:</strong> The sticky notes you add to the canvas should be contained within the categories of the business model canvas. For example, if you are adding a sticky note about your key partners, it should be placed inside the "Key Partners" shape box.
//     </p>
//     `,
//   }

//   const allGroupedItems = await stickiesCollection.get("data")
//   console.log(allGroupedItems);
//   if (!allGroupedItems) addCanvas();
//   else generateBusinessModelDocument();
// }

// start();
