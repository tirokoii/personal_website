Vet inte vad problemet var men nodemon ville inte starta upp ordentligt, löste sig tillslut, men var troligtvis pågrund av ett skrivfel.

404 error fungerade inte först, det var att man behövde ha next som ett argument i alla routes

Den ville inte fortsätta till nästa error page, problemet var att (err) i metoden gjorde att next inte var giltig längre, och det visar sig att man behöver ha next i alla metoder för att det ska fungera.

Eftersom cookies försvinner varje gång man gör fil förändringar, kommenterar jag ut sessions i create routen tills jag har skapat layouten samt metoderna för den.

Jag hade stora problem med att få checkboxarna att fungera, jag hade tydligen inte lärt mig så mycket om hur arrays och for loopen fungerar i js. For loop med:
for (i in item) ger en index, vilket jag hade glömt totalt. Dessutom hade jag ingen anning hur man skulle ta bort ett objekt från en array, vilket visade sig bara vara splice(start_index, längd).

