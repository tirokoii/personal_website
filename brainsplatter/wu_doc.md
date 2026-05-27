# Tester
## Validator.w3.org
- 11 errors

Error: Bade value / for attribute on element a: Backslash ("/") used as path segment delimiter. x3

* Fixad (Hade satt in fel slash, skulle vara frontslash "/" men var backslash "\")

Error: Element ul not allowed as child of element ul in this context. (Suppressing further errors from this subtree.) x2

* Inte fixad (ser inte varför det är ett problem)

Error: Bad value static-images/Mona-Lisa 2.0.png for attribute src on element img: Illegal character in path segment. Space is not allowed. x4

* Fixad (den tycker inte om space)

Error: Stray start tag script. + Fatal Error: Cannot recover after last error. Any further errors will be ignored.

* Fixad (hade script tag utanför html tag)

## Wave

### Index
- 5 Alerts

Suspicious alternative text x1

* Inte fixad (Tycker inte att det är viktigt)

Skipped heading level x2

* Inte fixad (Jag tycker inte att det är ett problem)

2 Device dependent event handler x 2 (för telefon version med navigation)

* Inte fixat ännu (fixar det senare när jag färdigställer telefon versionen)

### Blog

- 8 Alerts

Suspicious alternative text x5

* Inte fixad

Skipped heading level x1

* Inte Fixad

2 Device dependent event handler x 2 (för telefon version med navigation)

* Inte fixad

### About me

- 2 Contrast Errors
- 5 Alerts

Suspicious alternative text x1

* Inte fixad

Skipped heading level x2

* Inte fixad

2 Device dependent event handler x 2 (för telefon version med navigation)

* Inte fixad

## Lighthouse

### Index

#### Dator
- Prstanda: 100
- Tillgänglighet: 89
    - Tabeller och listor (li nav)
- Bästa metoder: 100
- SEO: 91
    - Ingen metabeskrivning

#### Mobil
- Prestanda: 76
    - Largest Contentful Paint
- Tillgänglighet: 96
- Bästa metoder: 100
- SEO: 91

### About me

#### Dator
- Prestanda: 96
- Tillgänglighet: 76
    - Tabeller och listor (li)
    - Kontrast mellan bakgroundsfärg och förgrundsfärg
- Bästa metoder: 100
    - Tryckområdena är för små och har inte tillräckliga avstånd.
- SEO: 91

#### Telefon
- Prestanda: 76
    - Largest Contentful Paint (8.0 s)
    - Alla bilder har inte witdh och height
- Tillgänglighet: 83
    - Kontrast
- Bästa metoder: 100
    - Tryckområden
- SEO: 91

### Blog

#### Dator
- Prestanda: 96
- Tillgänglighet: 89
    - Tabeller och listor (li, nav)
- Bästa metoder: 100
- SEO: 91

#### Mobil
- Prestanda: 76
    - Largest Contentful Paint
- Tillgänglighet: 97
- Bästa metoder: 100
- SEO: 91

# Tekinker
Jag har främst använt mig av, flexbox för att den är enkel att skala och göra om. Ett litet tag funderade jag på om man skulle använda grid men eftersom webbsidan ska kunna enkelt göras om till en column för mobil versionen valdes flexbox. För att göra det enklare för mig själv är css filerna indelade i grupper för vilken del av webbsidan de tillhör. Jag har även valt att använda media only för att bättre anpassa websidan till telefon, istället för att exlusivt använda clamps, min, max, % eller vw/vh, det känns som att det blir mindre joxs då.