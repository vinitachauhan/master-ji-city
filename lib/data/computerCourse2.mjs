// Complete Computer Course - Part 2: Modules 9-16 (internet to programming, AI and jobs).
const L = (title, learn, steps, keys, practice, lab) => ({ title, learn, steps, keys, practice, lab });

export const MODULES_2 = [
  {
    id: 'internet', emoji: '🌐', title: 'Internet, Email and Google Tools', level: 'Beginner', hours: 5,
    lessons: [
      L('What is the internet?', 'The internet is a worldwide network of computers. A website has an address (URL) like https://www.india.gov.in. A browser (Chrome, Edge, Firefox) opens websites. https and a lock icon mean a secure connection.', ['Open Chrome.', 'Type a URL in the address bar and press Enter.', 'Use the back, forward and refresh buttons.', 'Open a new tab with Ctrl + T.'], [['Ctrl + T', 'New tab'], ['Ctrl + W', 'Close tab'], ['F5', 'Refresh'], ['Ctrl + D', 'Bookmark']], 'Write 5 useful government websites in Notepad (india.gov.in, digilocker.gov.in ...).', 'notepad'),
      L('Searching smartly', 'Google is a search engine. Use short keywords: "class 10 science notes". Use quotes for exact words, and check if the website is trustworthy (.gov.in, .nic.in, .edu).', ['Go to google.com.', 'Type keywords, not long sentences.', 'Open 2-3 results and compare.', 'Use "Images", "News" and "Maps" tabs.'], [], 'Search the weather of your city and write it in Notepad.', 'notepad'),
      L('Email (Gmail)', 'Email address looks like name@gmail.com. Parts of an email: To, Cc, Bcc, Subject, body, attachment, signature. Write politely and clearly.', ['Create a Gmail account (with a parent’s help if under 13).', 'Click Compose.', 'Type To, Subject and message.', 'Click 📎 to attach a file, then Send.'], [], 'Write a formal email to your teacher in WordPad first (To, Subject, Greeting, Message, Regards).', 'wordpad'),
      L('Google Drive, Docs, Sheets and Forms', 'Google Drive stores files online (15 GB free). Google Docs (like Word), Sheets (like Excel), Slides (like PowerPoint) and Forms (surveys, quizzes) work in the browser and can be shared.', ['Open drive.google.com.', 'New → Google Docs.', 'Click Share → add an email → Viewer or Editor.', 'New → Google Forms → make a 3-question quiz.'], [], 'Plan a class survey form with 5 questions in Notepad.', 'notepad'),
      L('Video calls and online learning', 'Google Meet and Zoom for classes and meetings. DIKSHA, SWAYAM, NPTEL and YouTube for free learning. Mute your mic when not speaking.', ['Open the meeting link.', 'Allow camera and microphone.', 'Use mute/unmute and chat.', 'Leave the meeting at the end.'], [], 'Find one free course on SWAYAM and write its name.', 'notepad'),
    ],
    quiz: [
      ['A browser is used to ___?', 'Open websites', 'Type letters only', 'Draw', 'Calculate'],
      ['Secure websites start with ___?', 'https', 'ftp', 'www only', 'mail'],
      ['New browser tab shortcut?', 'Ctrl + T', 'Ctrl + N', 'Ctrl + B', 'Ctrl + Z'],
      ['In email, the topic is written in ___?', 'Subject', 'To', 'Cc', 'Bcc'],
      ['Google’s spreadsheet app is ___?', 'Sheets', 'Docs', 'Slides', 'Forms'],
      ['To send a file with an email use ___?', 'Attachment', 'Signature', 'Subject', 'Draft'],
      ['Government websites usually end with ___?', '.gov.in', '.com', '.xyz', '.game']],
  },
  {
    id: 'safety', emoji: '🛡️', title: 'Cyber Safety, UPI and e-Governance', level: 'Beginner', hours: 3,
    lessons: [
      L('Strong passwords and privacy', 'A strong password has 12+ characters with capital and small letters, numbers and symbols (Mera@Gaon2025!). Never share passwords or OTP. Turn on 2-step verification.', ['Make a password from a sentence you remember.', 'Use different passwords for email and banking.', 'Enable 2-step verification in your Google account.'], [], 'Write 3 rules for a strong password in Notepad (do not write real passwords!).', 'notepad'),
      L('Frauds, phishing and fake news', 'Phishing = fake messages or links that steal data ("You won a lottery!", "KYC expired"). Banks never ask for OTP or PIN. Check news on trusted sites before forwarding. Report cyber crime at cybercrime.gov.in or call 1930.', ['Do not click unknown links.', 'Check the sender and spelling of the website.', 'If cheated, call 1930 immediately.'], [], 'Make a "Stay Safe Online" poster in Paint.', 'paint'),
      L('UPI and digital payments', 'UPI (BHIM, PhonePe, Google Pay, Paytm) sends money using a UPI ID or QR code. UPI PIN is only for SENDING money - you never need a PIN to receive money.', ['Scan the shop’s QR code.', 'Check the name of the shop on the screen.', 'Enter the amount and your UPI PIN.', 'Keep the payment screenshot.'], [], 'Write the steps of a safe UPI payment in WordPad.', 'wordpad'),
      L('e-Governance services', 'DigiLocker (documents), UMANG (1,000+ services), Aadhaar (uidai.gov.in), CSC centres, IRCTC tickets, PM-KISAN, scholarships (scholarships.gov.in), e-Shram card.', ['Open digilocker.gov.in.', 'Sign in with Aadhaar and mobile OTP.', 'Fetch your marksheet or driving licence.'], [], 'List 5 e-governance services and their use in Excel.', 'excel'),
    ],
    quiz: [
      ['Cyber crime helpline in India?', '1930', '100', '102', '1098'],
      ['UPI PIN is needed to ___ money.', 'Send', 'Receive', 'Count', 'Print'],
      ['A fake message to steal data is ___?', 'Phishing', 'Fishing trip', 'Backup', 'Update'],
      ['Should you share OTP with a bank caller?', 'Never', 'Yes', 'Sometimes', 'Only on Sunday'],
      ['DigiLocker is used for ___?', 'Storing documents', 'Games', 'Music', 'Shopping'],
      ['A strong password has ___?', 'Letters, numbers and symbols', 'Only your name', '1234', 'Your birthday']],
  },
  {
    id: 'tally', emoji: '🧾', title: 'Tally Prime with GST (Accounting)', level: 'Intermediate', hours: 10,
    lessons: [
      L('Accounting basics for Tally', 'Debit and credit; assets, liabilities, income, expenses. Ledgers are accounts (Cash, Bank, Sales, Ravi Traders). Groups: Sundry Debtors (customers), Sundry Creditors (suppliers), Sales Accounts, Purchase Accounts, Indirect Expenses.', ['Understand: Cash sale → Cash Dr, Sales Cr.', 'Purchase on credit → Purchase Dr, Supplier Cr.', 'Expense paid → Expense Dr, Cash Cr.'], [], 'Make a table of 5 transactions with Debit and Credit in Excel.', 'excel'),
      L('Company and ledger creation', 'Create a company (name, address, state, financial year, GST). Create ledgers under the right groups.', ['Open Tally Prime → Create Company → fill details → Accept (Ctrl + A).', 'Gateway → Create → Ledger.', 'Name "Sharma Stores", Under: Sundry Debtors.', 'Create "Sales @ 18%" under Sales Accounts.'], [['Alt + K', 'Company menu'], ['Ctrl + A', 'Accept / save'], ['Esc', 'Go back']], 'List 10 ledgers and their groups in Excel.', 'excel'),
      L('Vouchers', 'Contra (F4) - cash to bank. Payment (F5) - money paid. Receipt (F6) - money received. Journal (F7) - adjustments. Sales (F8). Purchase (F9). Credit Note (Ctrl + F8), Debit Note (Ctrl + F9).', ['Gateway → Vouchers.', 'Press F8 for Sales.', 'Select party, item, quantity, rate.', 'Ctrl + A to save.'], [['F4', 'Contra'], ['F5', 'Payment'], ['F6', 'Receipt'], ['F7', 'Journal'], ['F8', 'Sales'], ['F9', 'Purchase']], 'Write 10 transactions of a shop and the voucher key for each.', 'excel'),
      L('Inventory - stock items', 'Stock groups, stock items, units (Nos, Kg), godowns. Stock Summary shows quantity and value.', ['Create → Stock Item → "Rice 1 kg" → Unit Kg → GST 5%.', 'Make purchase and sales vouchers with items.', 'Display More Reports → Stock Summary.'], [], 'Make a stock register (Item, In, Out, Balance) in Excel with formulas.', 'excel'),
      L('GST and reports', 'Within state: CGST + SGST (9% + 9% for 18%). Other state: IGST 18%. Returns: GSTR-1 (sales), GSTR-3B (summary). Reports: Day Book, Trial Balance, Profit & Loss, Balance Sheet.', ['F11 → enable GST → enter GSTIN.', 'Create tax ledgers CGST, SGST, IGST under Duties & Taxes.', 'Make a sales invoice with GST.', 'View Balance Sheet and Profit & Loss.'], [['F11', 'Features (GST)'], ['Alt + P', 'Print']], 'Make a GST invoice in Excel: Amount, CGST 9%, SGST 9%, Total.', 'excel'),
    ],
    quiz: [
      ['Sales voucher key in Tally?', 'F8', 'F5', 'F4', 'F9'],
      ['Customers are kept under ___?', 'Sundry Debtors', 'Sundry Creditors', 'Capital', 'Fixed Assets'],
      ['Cash deposited in bank is a ___ voucher.', 'Contra', 'Sales', 'Journal', 'Purchase'],
      ['Within the same state GST is ___?', 'CGST + SGST', 'IGST', 'No GST', 'VAT'],
      ['Shortcut to save (accept) in Tally?', 'Ctrl + A', 'Ctrl + S', 'Ctrl + Q', 'Alt + F4'],
      ['Payment voucher key?', 'F5', 'F6', 'F7', 'F8'],
      ['GST features are enabled with ___?', 'F11', 'F12', 'F1', 'F3']],
  },
  {
    id: 'html', emoji: '🧱', title: 'Web Design - HTML and CSS', level: 'Advanced', hours: 10,
    lessons: [
      L('First web page', 'HTML (HyperText Markup Language) builds web pages using tags: <h1> heading, <p> paragraph, <b> bold, <br> new line. Structure: <html><head><title>...</title></head><body>...</body></html>.', ['Open the HTML & JS tab in the Computer Lab.', 'Type <h1>Hello</h1><p>My first page</p>.', 'Click ▶️ Run and see the result.'], [], 'Make a page with your name as heading and 3 lines about you.', 'code'),
      L('Links, images, lists and tables', '<a href="https://...">link</a>, <img src="photo.jpg" width="200">, <ul><li>item</li></ul>, <ol>, <table><tr><td>cell</td></tr></table>.', ['Add a list of your hobbies with <ul>.', 'Add a link to india.gov.in.', 'Make a timetable with <table border="1">.'], [], 'Run the "Lists and table" template and add one more row.', 'code'),
      L('Forms', '<form>, <input type="text">, <input type="email">, <input type="radio">, <select>, <textarea>, <button>. Forms collect data (admission form, feedback).', ['Make a form with Name, Class and a Submit button.', 'Add radio buttons for Male / Female / Other.', 'Add a dropdown with <select>.'], [], 'Make an admission form page.', 'code'),
      L('CSS styling', 'CSS styles HTML: colour, background, font-size, margin, padding, border, border-radius. Selectors: tag (h1), class (.card), id (#top). Box model: content → padding → border → margin.', ['Write <style> h1 { color: blue; } </style>.', 'Make a .card class with background and padding.', 'Change fonts and colours.'], [], 'Run "Colours and style (CSS)" and change all colours.', 'code'),
      L('Layout and responsive design', 'Flexbox (display: flex; gap; justify-content) arranges items in a row. Media queries make pages fit mobiles: @media (max-width: 600px) { ... }.', ['Make 3 boxes in a row with display: flex.', 'Add gap: 10px.', 'Use a media query to stack them on mobile.'], [], 'Make your resume page with CSS and save it as .html.', 'code'),
      L('Publishing a website', 'Domain name (yourname.in), hosting, free options: GitHub Pages, Netlify, Vercel. Upload your HTML files and share the link.', ['Make a GitHub account.', 'Create a repository and upload index.html.', 'Settings → Pages → Deploy.'], [], 'Save your page with 💾 Save .html and open it in a browser.', 'code'),
    ],
    quiz: [
      ['HTML stands for ___?', 'HyperText Markup Language', 'High Text Machine Language', 'Home Tool Markup Language', 'Hyper Transfer Mail Language'],
      ['Tag for the biggest heading?', '<h1>', '<h6>', '<p>', '<head>'],
      ['Tag for a link?', '<a>', '<link>', '<img>', '<li>'],
      ['CSS is used for ___?', 'Styling pages', 'Databases', 'Accounting', 'Typing'],
      ['A class selector starts with ___?', '.', '#', '@', '*'],
      ['Space inside a border is ___?', 'Padding', 'Margin', 'Gap', 'Outline'],
      ['Tag for a picture?', '<img>', '<pic>', '<a>', '<src>'],
      ['To arrange boxes in a row use ___?', 'display: flex', 'color: red', 'font-size', 'border']],
  },
  {
    id: 'javascript', emoji: '⚡', title: 'JavaScript', level: 'Advanced', hours: 10,
    lessons: [
      L('Variables and output', 'JavaScript makes web pages interactive. let name = "Ravi"; const pi = 3.14; Output with alert(), console.log() or by changing the page: document.getElementById("out").textContent = "Hi".', ['Write <p id="out"></p>.', 'Add <script> let n = 5; document.getElementById("out").textContent = n * 2; </script>.', 'Click Run.'], [], 'Show your name and age on the page with JavaScript.', 'code'),
      L('Events and functions', 'A function is a block of code: function add() { ... }. Events run code when something happens: onclick, oninput, onchange.', ['Make <button onclick="hello()">Click</button>.', 'Write function hello() { alert("Namaste!"); }.', 'Run and click the button.'], [], 'Run the "Button and JavaScript" template and make it count down instead.', 'code'),
      L('Conditions and loops', 'if (marks >= 33) { ... } else { ... }. for (let i = 1; i <= 10; i++) { ... } repeats code. while loops repeat while a condition is true.', ['Write a loop that prints 1 to 10.', 'Change it to print the table of 5.', 'Use if to print "Even" or "Odd".'], [], 'Run "Times table (loop)" and change it to any number typed in an input box.', 'code'),
      L('Arrays and objects', 'Array: let fruits = ["Mango", "Apple"]; fruits.push("Banana"); fruits.length. Object: let student = { name: "Sita", marks: 90 }; student.name.', ['Make an array of 5 friends.', 'Show them as a list using a for loop.', 'Make an object for yourself with name, class, city.'], [], 'Make a page that lists your favourite fruits from an array.', 'code'),
      L('Project - calculator and quiz', 'Combine inputs, buttons, functions and if-else to build real mini apps.', ['Read input values with Number(document.getElementById("a").value).', 'Show the result in a <b> tag.', 'For the quiz: compare the chosen answer and add to the score.'], [], 'Improve the "Simple calculator" to do +, −, ×, ÷.', 'code'),
    ],
    quiz: [
      ['Keyword to make a variable?', 'let', 'make', 'var only in Python', 'print'],
      ['Which event runs on a button click?', 'onclick', 'onsleep', 'onprint', 'onload only'],
      ['for (let i = 1; i <= 3; i++) runs ___ times.', '3', '2', '4', '1'],
      ['An array is written with ___?', '[ ]', '{ }', '( )', '< >'],
      ['To show a popup message use ___?', 'alert()', 'popup()', 'show()', 'msg()'],
      ['"5" + 2 in JavaScript gives ___?', '"52"', '7', '3', 'Error']],
  },
  {
    id: 'python', emoji: '🐍', title: 'Python Programming', level: 'Advanced', hours: 15,
    lessons: [
      L('First program', 'Python is an easy language used in AI, data science, websites and automation. print("Hello") shows text. Comments start with #.', ['Open the 🐍 Python tab in the Computer Lab.', 'Type print("Namaste India")', 'Click ▶️ Run.'], [], 'Print your name, class and city on 3 lines.', 'python'),
      L('Variables, input and data types', 'name = "Ravi" (str), age = 12 (int), height = 4.5 (float), is_student = True (bool). input() reads text; int(input()) reads a number.', ['a = int(input("First number: "))', 'b = int(input("Second number: "))', 'print("Sum =", a + b)'], [], 'Write a program for simple interest: SI = P × R × T / 100.', 'python'),
      L('Conditions', 'if, elif, else decide what to do. Indentation (4 spaces) is compulsory. Operators: ==, !=, >, <, >=, <=, and, or, not.', ['marks = int(input("Marks: "))', 'if marks >= 90: print("A")', 'elif marks >= 33: print("Pass")', 'else: print("Fail")'], [], 'Make a grade calculator.', 'python'),
      L('Loops', 'for i in range(1, 11): repeats 10 times. while repeats while a condition is true. break stops, continue skips.', ['for i in range(1, 11):', '    print(7, "x", i, "=", 7 * i)'], [], 'Print the table of any number entered by the user.', 'python'),
      L('Lists, dictionaries and functions', 'List: fruits = ["mango", "apple"]; fruits.append("banana"). Dictionary: marks = {"Ravi": 80}. Function: def area(l, b): return l * b.', ['def square(n): return n * n', 'print(square(5))', 'Make a list of 5 marks and print sum(marks) / len(marks).'], [], 'Make a student marks dictionary and print the topper.', 'python'),
      L('Projects', 'Number guessing game (import random), simple calculator, to-do list, marks report. Next steps: files, modules, pandas for data, Flask for websites.', ['import random', 'secret = random.randint(1, 10)', 'guess = int(input("Guess 1-10: "))', 'print("Correct!" if guess == secret else "Try again, it was", secret)'], [], 'Make the number guessing game with 3 chances.', 'python'),
    ],
    quiz: [
      ['Function to show output in Python?', 'print()', 'echo()', 'show()', 'write()'],
      ['Data type of 4.5?', 'float', 'int', 'str', 'bool'],
      ['range(1, 5) gives numbers ___?', '1 to 4', '1 to 5', '0 to 5', '2 to 5'],
      ['Comments in Python start with ___?', '#', '//', '<!--', '%%'],
      ['To make a function use ___?', 'def', 'function', 'fun', 'make'],
      ['Python blocks are made by ___?', 'Indentation', 'Curly braces', 'Semicolons', 'Brackets']],
  },
  {
    id: 'ai', emoji: '🤖', title: 'Artificial Intelligence and Smart Tools', level: 'Advanced', hours: 4,
    lessons: [
      L('What is AI?', 'Artificial Intelligence lets computers learn from data and do smart tasks: voice assistants, face unlock, translation, recommendations (YouTube), self-driving cars. Machine Learning = learning patterns from examples.', ['Ask a voice assistant a question.', 'Notice how YouTube suggests videos you like - that is AI.', 'Google Translate: Hindi ↔ English with AI.'], [], 'Write 5 uses of AI in daily life (city and village) in Notepad.', 'notepad'),
      L('Using AI chat assistants well', 'AI assistants (like Master Ji’s Doubt Solver) explain topics, give ideas and check writing. Write clear prompts: who you are, what you need, format. Always check facts - AI can make mistakes.', ['Open the 🤖 Doubt Solver on this website.', 'Ask: "Explain photosynthesis for Class 7 in 5 points."', 'Ask a follow-up question.'], [], 'Write 3 good prompts for your studies in Notepad.', 'notepad'),
      L('AI safety and ethics', 'Do not share personal data with AI apps. Do not copy AI answers for homework - learn from them. Deepfakes are fake videos made by AI - verify before believing.', ['Check facts from a textbook or trusted site.', 'Never upload others’ photos without permission.'], [], 'Make a poster "Use AI Wisely" in Paint.', 'paint'),
    ],
    quiz: [
      ['AI stands for ___?', 'Artificial Intelligence', 'Automatic Internet', 'All Information', 'Advanced Input'],
      ['Learning patterns from data is ___?', 'Machine Learning', 'Typing', 'Printing', 'Scanning'],
      ['Should you always trust AI answers?', 'No, check facts', 'Yes, always', 'Only at night', 'Only long answers'],
      ['A fake AI-made video is a ___?', 'Deepfake', 'Backup', 'Firewall', 'Cookie'],
      ['Which is an AI example?', 'Face unlock', 'Pencil', 'Bicycle', 'Chair']],
  },
  {
    id: 'career', emoji: '💼', title: 'Computer Jobs, Certificates and Resume', level: 'Job-ready', hours: 3,
    lessons: [
      L('Computer certificates in India', 'CCC (NIELIT - Course on Computer Concepts, 80 hours, needed for many UP government jobs), O Level (NIELIT, 1 year), DCA / ADCA, Tally certification, Google and Microsoft certificates, NPTEL courses.', ['Visit nielit.gov.in for CCC and O Level.', 'Choose a course based on the job you want.', 'Practise in this Computer Course and Lab first.'], [], 'Make a table of 4 certificates, duration and use in Excel.', 'excel'),
      L('Jobs after computer courses', 'Data entry operator, computer operator, CSC operator, accountant (Tally), office assistant, web designer, graphic designer, junior developer, digital marketer, IT support. Government: SSC CHSL (DEO), banks, railways.', ['Typing 35 WPM + MS Office → data entry jobs.', 'Tally + GST → accountant jobs.', 'HTML/CSS/JS → web design and freelancing.', 'Python → developer and data jobs.'], [], 'Write the skills you need for your dream job in WordPad.', 'wordpad'),
      L('Making a resume', 'A resume has: name and contact, objective, education, skills (MS Office, Tally, typing speed, HTML, Python), certificates, projects, languages, hobbies. Keep it to 1 page.', ['Open WordPad.', 'Type your name as a big heading.', 'Add sections with bold headings and bullet lists.', 'Save for Word and as PDF.'], [], 'Make your resume in WordPad, or as a web page in the HTML tab.', 'wordpad'),
      L('Freelancing and working online', 'Sites like Upwork, Fiverr and Internshala offer paid work and internships: data entry, typing, design, websites. Build a portfolio, be honest, meet deadlines, and never pay money to get a "job".', ['Make a portfolio of your best Paint, Excel and web projects.', 'Create a profile on Internshala for internships.', 'Beware of fake jobs that ask for fees.'], [], 'List 5 projects you made in this course for your portfolio.', 'notepad'),
    ],
    quiz: [
      ['CCC certificate is given by ___?', 'NIELIT', 'RBI', 'ISRO', 'NCERT'],
      ['Typing speed often needed for data entry jobs?', '30-40 WPM', '2 WPM', '500 WPM', 'No typing'],
      ['A resume should usually be ___ page.', '1', '10', '20', '50'],
      ['Real jobs ask for a fee to join?', 'No - that is a fraud', 'Yes, always', 'Only online', 'Only on Sunday'],
      ['Tally + GST skills lead to ___ jobs.', 'Accountant', 'Pilot', 'Doctor', 'Chef'],
      ['A collection of your best work is a ___?', 'Portfolio', 'Password', 'Virus', 'Folder only']],
  },
];
