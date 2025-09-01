import { useEffect, useState } from "react";
import { apiGetProductById } from "../api/products";

// Definierar tillgängliga färger som konstant utanför komponenten
// Detta förhindrar att arrayen skapas om vid varje render
const COLORS = ["#dc9ff6", "#a3af9f", "#75d4e8"];

export function ProductPage({ pageData }) {
  // En state för att hålla koll på produkt information som vi hämtar från API
  const [product, setProduct] = useState(null);
  
  // State för att hålla koll på vilken bild som visas som stor bild
  // Börjar som null eftersom vi inte har laddat produkten än
  const [activeImage, setActiveImage] = useState(null);
  
  // State för att hålla koll på vilken tag användaren har valt från dropdown
  // Börjar som tom sträng så att inget är valt från början
  const [tagSelect, setTagSelect] = useState("");
  
  // State för att hålla koll på vilken färg användaren har valt
  // Börjar med första färgen i COLORS arrayen som default
  const [colorSelect, setColorSelect] = useState(COLORS[0]);

  // pageData kommer att innehålla ett produkt id
  // Använd det id:t för att anropa API:et och hämta information
  // om specifik produkt (som vi tryckte på tidigare)
  // Vi vill endast hämta informationen en gång och därför ligger koden i en
  // useEffect med tom dependency array []
  useEffect(() => {
    apiGetProductById(pageData.productId).then((product) => {
      setProduct(product);
      // Nedanför kan göras som alternativ till useEffect med dependency till product
      // setActiveImage(product.images[0]);
    });
  }, []); // Tom dependency array = körs bara en gång när komponenten mountas

  // Separat useEffect för att sätta första bilden som aktiv bild
  // Denna körs när product ändras från null till faktisk produktdata
  useEffect(() => {
    if (product !== null) {
      // Sätter första bilden i produktens bildarray som den aktiva bilden
      setActiveImage(product.images[0]);
    }
  }, [product]); // Dependency array med product = körs när product ändras

  // product börjar på null, vilket innebär att den inte hunnit anropa API:et än
  // därför returnerar vi "Loading product" så länge
  // Detta kallas för "conditional rendering" - vi visar olika innehåll beroende på state
  if (product === null) {
    return <div>Loading product...</div>;
  }

  // Huvudinnehållet som visas när produkten är laddad
  return (
    <div>
      {/* Sektion för produkttitel och beskrivning */}
      <section>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
      </section>

      {/* Sektion för produktbilder - visas bara om activeImage finns */}
      {/* && operatorn används för conditional rendering */}
      {activeImage && (
        <section>
          {/* Stor huvudbild som visar den aktiva bilden */}
          <img width="500px" src={activeImage} />
          
          {/* Container för alla miniatyrbilder */}
          <div>
            {/* Loopar igenom alla produktbilder och skapar knappar för varje bild */}
            {product.images.map((image, index) => (
              <button 
                key={index} // Viktigt att ha key när man använder map()
                onClick={() => setActiveImage(image)} // Uppdaterar activeImage när man klickar
              >
                {/* Miniatyrbild i varje knapp */}
                <img src={image} width="100px" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Sektion för produktval - tags och färger */}
      <section>
        {/* Dropdown för att välja produkttags */}
        <select
          value={tagSelect} // Kontrollerad komponent - värdet kommer från state
          onChange={(event) => setTagSelect(event.target.value)} // Uppdaterar state när användaren väljer
        >
          {/* Loopar igenom alla produkttags och skapar option-element för varje tag */}
          {product.tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Container för färgknappar */}
        <div>
          {/* Loopar igenom COLORS arrayen och skapar en knapp för varje färg */}
          {COLORS.map((color, index) => (
            <button
              key={index} // Viktigt att ha key när man använder map()
              onClick={() => setColorSelect(color)} // Uppdaterar vald färg när man klickar
              style={{
                backgroundColor: color, // Sätter knappens bakgrundsfärg till den aktuella färgen
                width: "50px",
                height: "50px",
                borderRadius: "50%", // Gör knappen rund
              }}
            >
              {/* Visar en bock (✓) bara om denna färg är den valda färgen */}
              {/* Detta är conditional rendering med && operatorn */}
              {color === colorSelect && "✓"}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
