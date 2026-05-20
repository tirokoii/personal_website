Vet inte vad problemet var men nodemon ville inte starta upp ordentligt, löste sig tillslut, men var troligtvis pågrund av ett skrivfel.

404 error fungerade inte först, det var att man behövde ha next som ett argument i alla routes

Den ville inte fortsätta till nästa error page, problemet var att (err) i metoden gjorde att next inte var giltig längre, och det visar sig att man behöver ha next i alla metoder för att det ska fungera.

Eftersom cookies försvinner varje gång man gör fil förändringar, kommenterar jag ut sessions i create routen tills jag har skapat layouten samt metoderna för den.

Jag hade stora problem med att få checkboxarna att fungera, jag hade tydligen inte lärt mig så mycket om hur arrays och for loopen fungerar i js. For loop med:
for (i in item) ger en index, vilket jag hade glömt totalt. Dessutom hade jag ingen anning hur man skulle ta bort ett objekt från en array, vilket visade sig bara vara splice(start_index, längd).

Before p i inner-list ville inte göra att pillarna hamnade precis innan p elementet fast den var position: absolute, den ville istället ta html body som sin parent och hamnade hela vägen åt vänster. Problemet var att jag inte hade satt parent elementet till p (li) som position: relative, när jag gjorde det fixade det sig.

Mergeade samman logout och sqlite-test branches och trots att det stod inga conflicts deleatades det data som jag hade från tidigare versionen av sqlite-test (vilket gjorde att sessions inte aktiverades korrekt). Jag försökte då att skapa en kopia av sqlite-test, för att förebygga om jag råkade göra några större fel när jag skulle reverta ändringarna. Vilket jag gjorde med commandot: git checkout -b sqlite-test-save. Jag ändrade sedan på sqlite-test manuellt genom att gå igenom min tidigare commit och dubbelkolla, eftersom det verkar vara svårt att reverta en commit/merge som man pushat. 

Dock fick jag någon conflict när jag skulle commita changesarna, jag följde då bara terminalen och skrev in: git config pull.rebase true, den lätt mest rimlig för att lösa mina problem, tydligen så tar den alla tidigare commits och applicerar dem en efter en, vilket då gjorde att jag kunde lösa konflicterna och få tillbaka mina tidigare changes.