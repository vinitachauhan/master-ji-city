// Complete Computer Course - Part 1: Modules 1-8 (basics to office software).
// Lesson: { title, learn, steps[], keys[[key, what]], practice, lab }  lab = Computer Lab tool to practise in
// Quiz:   [question, correct, wrong1, wrong2, wrong3]
const L = (title, learn, steps, keys, practice, lab) => ({ title, learn, steps, keys, practice, lab });

export const MODULES_1 = [
  {
    id: 'fundamentals', emoji: '💻', title: 'Computer Fundamentals', level: 'Beginner', hours: 4,
    lessons: [
      L('What is a computer?', 'A computer is an electronic machine that takes input, processes it and gives output. It is fast, accurate, never gets tired and can store a lot of data. It works on IPO: Input → Process → Output.', ['Input: you type 2 + 3 on the keyboard.', 'Process: the CPU adds the numbers.', 'Output: 5 is shown on the monitor.', 'Storage: you can save the result for later.'], [], 'Write 5 places where you see computers (ATM, mobile, railway counter...).', 'notepad'),
      L('Parts of a computer (hardware)', 'Hardware = parts you can touch. Input devices: keyboard, mouse, scanner, microphone, webcam. Output devices: monitor, printer, speaker, projector. CPU (Central Processing Unit) is the brain - it has the ALU (calculations), CU (control) and registers.', ['Look at a computer and point to the monitor, CPU, keyboard and mouse.', 'Name 3 input devices.', 'Name 3 output devices.', 'Remember: a touchscreen is both input and output.'], [], 'Draw a computer with all parts in Paint and label them with the Text tool.', 'paint'),
      L('Memory and storage', 'Primary memory: RAM (temporary, fast, erased when power goes off) and ROM (permanent, has start-up instructions). Secondary storage: hard disk (HDD), SSD, pen drive, memory card, cloud. Units: 8 bits = 1 byte, 1024 bytes = 1 KB, 1024 KB = 1 MB, 1024 MB = 1 GB, 1024 GB = 1 TB.', ['Check your phone: Settings → Storage - see how many GB are used.', 'A song is about 4 MB; a movie is about 1-2 GB.', 'More RAM = more apps open at once without slowing down.'], [], 'In Excel, write the memory units in column A and their size in column B.', 'excel'),
      L('Software and its types', 'Software = programs that tell the hardware what to do. System software: operating systems (Windows, Android, Linux), drivers. Application software: MS Word, Excel, browsers, games, WhatsApp. Utility software: antivirus, file compressors.', ['List 5 apps on your phone - they are application software.', 'Android / iOS on your phone is the operating system.', 'Updates fix bugs and improve safety - keep software updated.'], [], 'Make a list of 10 software in Notepad and write "System" or "Application" next to each.', 'notepad'),
      L('Types and generations of computers', 'Types: supercomputer (weather forecasting - PARAM in India), mainframe (banks), mini, micro / personal computers (desktop, laptop, tablet, smartphone). Generations: 1st vacuum tubes, 2nd transistors, 3rd integrated circuits, 4th microprocessors, 5th artificial intelligence.', ['PARAM was made by C-DAC, Pune.', 'Your mobile is a micro computer more powerful than early room-sized computers.', 'Charles Babbage is called the Father of the Computer.'], [], 'Write a WordPad page "Generations of Computers" with a heading and a numbered list.', 'wordpad'),
    ],
    quiz: [
      ['The brain of the computer is the ___?', 'CPU', 'Monitor', 'Mouse', 'Printer'],
      ['Which is an input device?', 'Keyboard', 'Printer', 'Speaker', 'Monitor'],
      ['RAM is ___ memory.', 'Temporary', 'Permanent', 'Optical', 'Cloud'],
      ['1 KB = ___ bytes', '1024', '1000', '100', '8'],
      ['Windows is ___ software.', 'System', 'Application', 'Utility only', 'Hardware'],
      ['Father of the Computer?', 'Charles Babbage', 'Bill Gates', 'Steve Jobs', 'Alan Turing'],
      ['India’s supercomputer series is called ___?', 'PARAM', 'ISRO', 'Aadhaar', 'BHIM'],
      ['A printer is an ___ device.', 'Output', 'Input', 'Storage', 'Processing'],
    ],
  },
  {
    id: 'windows', emoji: '🪟', title: 'Windows and File Management', level: 'Beginner', hours: 4,
    lessons: [
      L('Starting the computer and the desktop', 'Press the power button. Windows starts (booting). The first screen is the desktop. It has icons (shortcuts), the taskbar at the bottom, the Start button and the system tray (time, Wi-Fi, volume).', ['Press the power button on the CPU or laptop.', 'Type your password if asked.', 'Look at the desktop icons, taskbar and Start button.', 'Click the Start button to see all apps.'], [['Windows key', 'Open Start menu'], ['Windows + D', 'Show desktop']], 'Name 4 things you see on the desktop.', 'notepad'),
      L('Using the mouse and windows', 'Left click = select, double click = open, right click = options menu, drag = move. Every app opens in a window with Minimise (–), Maximise (□) and Close (×) buttons.', ['Double click "This PC" to open it.', 'Click – to minimise, □ to maximise, × to close.', 'Drag the title bar to move the window.', 'Drag a window edge to resize it.'], [['Alt + Tab', 'Switch between open windows'], ['Alt + F4', 'Close the window']], 'In Paint, practise dragging shapes with the mouse.', 'paint'),
      L('Files and folders', 'A file stores your work (a letter, a photo). A folder holds many files. Extensions show the type: .txt (text), .docx (Word), .xlsx (Excel), .pdf, .jpg / .png (picture), .mp3 (song), .mp4 (video). File Explorer shows all drives (C:, D:) and folders.', ['Open File Explorer (Windows + E).', 'Go to Documents.', 'Right click → New → Folder → type "My School" → Enter.', 'Right click the folder → Rename to change its name.'], [['Windows + E', 'Open File Explorer'], ['F2', 'Rename'], ['Ctrl + Shift + N', 'New folder']], 'Make folders for each subject: Maths, Science, English.', 'notepad'),
      L('Copy, cut, paste, delete', 'Copy makes a duplicate; cut moves the item. Deleted files go to the Recycle Bin and can be restored. Shift + Delete removes permanently.', ['Select a file (single click).', 'Ctrl + C to copy (or Ctrl + X to cut).', 'Open the other folder, Ctrl + V to paste.', 'Press Delete; to bring it back open Recycle Bin → right click → Restore.'], [['Ctrl + C', 'Copy'], ['Ctrl + X', 'Cut'], ['Ctrl + V', 'Paste'], ['Ctrl + Z', 'Undo'], ['Ctrl + A', 'Select all']], 'Type a line in Notepad, then use Ctrl + A, Ctrl + C and Ctrl + V to paste it 5 times.', 'notepad'),
      L('Settings, shut down and care', 'Settings: change wallpaper, display, Wi-Fi, date and time, sound. Always shut down properly: Start → Power → Shut down. Never pull the plug. Keep the computer clean and dust free.', ['Start → Settings → Personalisation → choose a wallpaper.', 'Settings → Time & Language → set date and time.', 'Start → Power → Shut down.'], [['Windows + I', 'Open Settings'], ['Windows + L', 'Lock the computer']], 'Write the steps to shut down a computer in WordPad as a numbered list.', 'wordpad'),
    ],
    quiz: [
      ['Double click is used to ___?', 'Open', 'Delete', 'Copy', 'Shut down'],
      ['Shortcut to copy?', 'Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
      ['Deleted files go to the ___?', 'Recycle Bin', 'Desktop', 'Printer', 'Taskbar'],
      ['.xlsx is a file of ___?', 'Excel', 'Word', 'Paint', 'Music'],
      ['Windows + E opens ___?', 'File Explorer', 'Settings', 'Paint', 'Start menu'],
      ['To rename a file press ___?', 'F2', 'F5', 'F1', 'F12'],
      ['The bar at the bottom of the desktop is the ___?', 'Taskbar', 'Title bar', 'Scroll bar', 'Menu bar'],
      ['Ctrl + Z is used to ___?', 'Undo', 'Save', 'Print', 'Close']],
  },
  {
    id: 'typing', emoji: '⌨️', title: 'Keyboard and Typing', level: 'Beginner', hours: 6,
    lessons: [
      L('Keys of the keyboard', 'Alphabet keys (A-Z), number keys (0-9), function keys (F1-F12), arrow keys, Space bar, Enter, Backspace (deletes left), Delete (deletes right), Shift (capital letter / symbols), Caps Lock, Tab, Ctrl, Alt, Esc.', ['Find each key on the keyboard.', 'Press Caps Lock and type - all letters become capital.', 'Hold Shift and press 2 to get @.'], [['Shift + letter', 'One capital letter'], ['Caps Lock', 'All capitals on/off'], ['Backspace', 'Delete left'], ['Delete', 'Delete right']], 'Type the alphabet A to Z in capital and small letters.', 'typing'),
      L('Home row and finger position', 'Left fingers on A S D F, right fingers on J K L ;. Thumbs on the Space bar. F and J have small bumps to find them without looking. Every finger has its own keys - always come back to the home row.', ['Place fingers on the home row.', 'Type "asdf jkl;" ten times without looking.', 'Keep your back straight and wrists up.'], [], 'Do the Home row lesson in the Typing Tutor.', 'typing'),
      L('Top and bottom rows', 'Top row: Q W E R T Y U I O P - reach up from the home row. Bottom row: Z X C V B N M - reach down. Numbers row is above the top row.', ['Practise "the quick brown fox jumps over the lazy dog" - it has all letters.', 'Do not look at the keyboard; look at the screen.'], [], 'Do the "Letters A to Z" lesson with 90% accuracy.', 'typing'),
      L('Speed and accuracy', 'Speed is measured in WPM (words per minute). Accuracy matters more than speed. Government data entry and typing tests need about 30-40 WPM in English (and Hindi typing for some jobs).', ['Type for 10 minutes daily.', 'Fix your mistakes before trying to go faster.', 'Note your best WPM and try to beat it each week.'], [], 'Reach 20 WPM in the Sentences lesson, then 30 WPM in the Paragraph lesson.', 'typing'),
      L('Hindi typing basics', 'Windows has Hindi keyboards: Hindi Traditional / Inscript and "Hindi Phonetic". Google Input Tools and mobile keyboards let you type "namaste" and get "नमस्ते". Unicode fonts like Mangal and Noto Sans Devanagari are used everywhere.', ['Settings → Time & Language → Language → Add Hindi.', 'Press Windows + Space to switch between English and Hindi.', 'On mobile, add Hindi in Gboard and type phonetically.'], [['Windows + Space', 'Switch keyboard language']], 'Type your name in Hindi in Notepad.', 'notepad'),
    ],
    quiz: [
      ['Home row keys of the left hand?', 'A S D F', 'Q W E R', 'Z X C V', 'J K L ;'],
      ['Which keys have bumps?', 'F and J', 'A and ;', 'G and H', 'Space and Enter'],
      ['Typing speed is measured in ___?', 'WPM', 'KB', 'GHz', 'MB'],
      ['Backspace deletes the letter on the ___?', 'Left', 'Right', 'Top', 'Bottom'],
      ['To type one capital letter hold ___?', 'Shift', 'Ctrl', 'Alt', 'Tab'],
      ['Which sentence has all 26 letters?', 'The quick brown fox jumps over the lazy dog', 'India is my country', 'I like mangoes', 'Hello world'],
      ['Shortcut to switch keyboard language?', 'Windows + Space', 'Ctrl + C', 'Alt + F4', 'F2'],
      ['More important while learning typing?', 'Accuracy', 'Loud keys', 'Colour of keyboard', 'Looking at keys']],
  },
  {
    id: 'paint', emoji: '🎨', title: 'Paint and Digital Drawing', level: 'Beginner', hours: 3,
    lessons: [
      L('Opening Paint and tools', 'Paint is a drawing app in Windows. Tools: pencil, brushes, eraser, fill with colour (bucket), text (A), shapes, colour picker, select and crop.', ['Start → type "Paint" → Enter.', 'Choose the Pencil, pick a colour and draw.', 'Use the Eraser to remove mistakes.'], [['Ctrl + Z', 'Undo'], ['Ctrl + S', 'Save']], 'Draw a house in the Paint tab of the Computer Lab.', 'paint'),
      L('Shapes, fill and text', 'Shapes: line, rectangle, oval, triangle, star. Hold Shift while drawing for a perfect square or circle (in MS Paint). Fill colours a closed shape. Text tool writes words on the picture.', ['Draw a rectangle and an oval.', 'Click the bucket and click inside a shape to fill it.', 'Use the Text tool to write a title.'], [], 'Make a greeting card with shapes, colours and text.', 'paint'),
      L('Saving and opening pictures', 'Save as PNG (best quality) or JPG (smaller size). Open saved pictures again from File → Open. You can insert them in Word and PowerPoint.', ['File → Save As → PNG picture.', 'Choose the folder and type a name.', 'Open it again from File → Open.'], [['Ctrl + S', 'Save'], ['Ctrl + O', 'Open']], 'Save your drawing as a PNG file using 💾 Save PNG.', 'paint'),
      L('Poster design project', 'A good poster has a big title, one main picture, a short slogan and bright colours that can be seen from far away.', ['Choose a topic: Save Water / Clean India / Road Safety.', 'Write the title at the top in big letters.', 'Draw the main picture in the middle.', 'Add a slogan at the bottom. Save it.'], [], 'Make a "Save Water" poster in Paint.', 'paint'),
    ],
    quiz: [
      ['Which tool fills colour?', 'Bucket (Fill)', 'Eraser', 'Pencil', 'Select'],
      ['Which tool writes words in Paint?', 'Text (A)', 'Brush', 'Line', 'Crop'],
      ['Best format for a sharp drawing?', 'PNG', 'MP3', 'TXT', 'XLSX'],
      ['To undo a mistake press ___?', 'Ctrl + Z', 'Ctrl + P', 'Ctrl + B', 'Ctrl + N'],
      ['A good poster has a ___ title.', 'Big', 'Tiny', 'Hidden', 'Grey'],
      ['Removing extra parts of a picture is ___?', 'Crop', 'Fill', 'Paste', 'Print']],
  },
  {
    id: 'notepad', emoji: '🗒️', title: 'Notepad and WordPad', level: 'Beginner', hours: 3,
    lessons: [
      L('Notepad - plain text', 'Notepad saves only plain text (.txt) - no bold, colours or pictures. It is used for quick notes and by programmers to write code (HTML, Python).', ['Start → type "Notepad" → Enter.', 'Type your notes.', 'Edit → Time/Date (F5) adds today’s date.', 'File → Save As → name.txt.'], [['F5', 'Insert time and date'], ['Ctrl + S', 'Save'], ['Ctrl + F', 'Find']], 'Write a diary entry with the date in Notepad.', 'notepad'),
      L('WordPad - formatted text', 'WordPad can make text bold, italic, underlined, coloured, change fonts and sizes, align text and insert pictures. It is a simple version of MS Word.', ['Select text by dragging the mouse.', 'Click B for bold, I for italic, U for underline.', 'Change the font and size from the lists.', 'Click a colour button to colour text.'], [['Ctrl + B', 'Bold'], ['Ctrl + I', 'Italic'], ['Ctrl + U', 'Underline'], ['Ctrl + E', 'Centre align']], 'Write "My School" with a coloured, centred heading and a bullet list.', 'wordpad'),
      L('Lists, pictures and printing', 'Bullet lists (•) and numbered lists (1, 2, 3). Insert pictures from your computer. Print with Ctrl + P.', ['Click the bullet list button and type items.', 'Insert → Picture → choose a photo.', 'Ctrl + P → choose printer → Print.'], [['Ctrl + P', 'Print']], 'Make a shopping list with bullets and a picture.', 'wordpad'),
      L('Project - application letter', 'Write a leave application: To, The Principal, school name, date, subject, Respected Sir/Madam, body, Thanking you, your name and class.', ['Type the letter.', 'Make "Subject" bold.', 'Save it and print a copy.'], [], 'Write a leave application in WordPad and save it.', 'wordpad'),
    ],
    quiz: [
      ['Notepad saves files as ___?', '.txt', '.docx', '.xlsx', '.png'],
      ['Can Notepad make text bold?', 'No', 'Yes', 'Only red', 'Only headings'],
      ['Shortcut for bold?', 'Ctrl + B', 'Ctrl + I', 'Ctrl + U', 'Ctrl + D'],
      ['F5 in Notepad inserts ___?', 'Time and date', 'A picture', 'A table', 'A chart'],
      ['Programmers often write code in ___?', 'Notepad', 'Paint', 'Calculator', 'Camera'],
      ['Ctrl + E is used to ___ text.', 'Centre align', 'Delete', 'Copy', 'Save']],
  },
  {
    id: 'word', emoji: '📘', title: 'MS Word', level: 'Intermediate', hours: 8,
    lessons: [
      L('Word interface', 'MS Word is a word processor. The Ribbon has tabs: File, Home, Insert, Design, Layout, References, Mailings, Review, View. Quick Access Toolbar has Save and Undo. The status bar shows the page and word count.', ['Start → Word → Blank document.', 'Look at each Ribbon tab.', 'Type a paragraph; see the word count at the bottom.'], [['Ctrl + N', 'New document'], ['Ctrl + S', 'Save'], ['Ctrl + O', 'Open']], 'Type 5 lines about your city in WordPad (practice of Word).', 'wordpad'),
      L('Formatting text and paragraphs', 'Font, size, bold, italic, underline, colour, highlight, alignment (left, centre, right, justify), line spacing, bullets and numbering, styles (Heading 1, Heading 2).', ['Select the title → Home → Heading 1.', 'Select the paragraph → Justify (Ctrl + J).', 'Line spacing → 1.5.'], [['Ctrl + J', 'Justify'], ['Ctrl + ]', 'Bigger font'], ['Ctrl + [', 'Smaller font']], 'Format a project page with headings, justify and highlight.', 'wordpad'),
      L('Tables, pictures and shapes', 'Insert → Table to make rows and columns (timetable, marksheet). Insert → Pictures, Shapes, Icons, SmartArt, WordArt. Wrap text around pictures.', ['Insert → Table → 4 × 5.', 'Type the timetable.', 'Table Design → choose a style.', 'Insert → Picture → This Device.'], [], 'Make your class timetable as a table (try in the HTML tab with <table> or in Excel).', 'excel'),
      L('Page layout and printing', 'Layout: margins, orientation (portrait / landscape), size (A4), columns, page breaks. Insert → header, footer, page numbers. File → Print / Export as PDF.', ['Layout → Margins → Normal.', 'Insert → Page Number → Bottom.', 'File → Save As → PDF.'], [['Ctrl + Enter', 'Page break'], ['Ctrl + P', 'Print']], 'Write a 2-page essay with page numbers and save it as PDF (in Word on a real computer).', 'wordpad'),
      L('Spelling, find-replace and mail merge', 'Review → Spelling & Grammar (F7). Find (Ctrl + F) and Replace (Ctrl + H). Mail merge sends one letter to many people with their own names (Mailings tab).', ['Press F7 to check spellings.', 'Ctrl + H → find "Delhi" → replace "Noida".', 'Mailings → Start Mail Merge → Letters → Select Recipients → Insert Merge Field → Finish & Merge.'], [['F7', 'Spell check'], ['Ctrl + H', 'Replace']], 'Write an invitation letter; plan a mail merge list of 5 names in Excel.', 'excel'),
    ],
    quiz: [
      ['MS Word is a ___?', 'Word processor', 'Spreadsheet', 'Browser', 'Game'],
      ['Shortcut to justify text?', 'Ctrl + J', 'Ctrl + E', 'Ctrl + L', 'Ctrl + R'],
      ['Spell check key?', 'F7', 'F5', 'F2', 'F12'],
      ['Find and replace shortcut?', 'Ctrl + H', 'Ctrl + F', 'Ctrl + R', 'Ctrl + G'],
      ['Sending one letter to many names uses ___?', 'Mail merge', 'Page break', 'WordArt', 'Header'],
      ['Landscape and portrait are types of ___?', 'Orientation', 'Font', 'Margin', 'Table'],
      ['Page break shortcut?', 'Ctrl + Enter', 'Ctrl + B', 'Shift + Enter', 'Alt + Enter'],
      ['Which tab has Table and Picture?', 'Insert', 'Home', 'Review', 'View']],
  },
  {
    id: 'excel', emoji: '📊', title: 'MS Excel', level: 'Intermediate', hours: 10,
    lessons: [
      L('Excel basics - cells, rows, columns', 'Excel is a spreadsheet. Columns are letters (A, B, C), rows are numbers (1, 2, 3). A cell is where they meet (B3). A file is a workbook; it has sheets. The formula bar shows what is inside a cell.', ['Click cell A1 and type "Name".', 'Press Tab to go right, Enter to go down.', 'Type names in column A and marks in column B.'], [['Tab', 'Next cell right'], ['Enter', 'Next cell down'], ['Ctrl + Home', 'Go to A1']], 'Make a list of 5 friends with their marks.', 'excel'),
      L('Formulas', 'Every formula starts with =. Use cell addresses: =B2+C2, =B2-C2, =B2*C2, =B2/C2. If the numbers change, the answer changes by itself.', ['In D2 type =B2+C2 and press Enter.', 'Change B2 - see D2 change automatically.', 'Use brackets: =(B2+C2)/2.'], [], 'Make a marksheet with Total = Maths + Science.', 'excel'),
      L('Functions - SUM, AVERAGE, MAX, MIN, COUNT', '=SUM(B2:B10) adds a range. =AVERAGE() gives the mean, =MAX() the highest, =MIN() the lowest, =COUNT() the number of numbers. B2:B10 means all cells from B2 to B10.', ['Type marks in B2:B6.', 'In B7 type =SUM(B2:B6).', 'In B8 type =AVERAGE(B2:B6).', 'Find the highest with =MAX(B2:B6).'], [['Alt + =', 'AutoSum']], 'Find total, average, highest and lowest marks of your class.', 'excel'),
      L('IF, sorting, filtering and formatting', '=IF(D2>=33,"Pass","Fail") makes a decision. Sort A→Z or Z→A. Filter shows only matching rows. Format cells: bold, colours, borders, number format (₹, %), conditional formatting.', ['Select data → Data → Sort → by Total → Largest to Smallest.', 'Data → Filter → show only "Pass".', 'Home → Conditional Formatting → highlight marks below 33 in red.'], [['Ctrl + Shift + L', 'Filter on/off'], ['Ctrl + 1', 'Format cells']], 'Use IF to mark pass/fail (1/0) and sort by total.', 'excel'),
      L('Charts and printing', 'Charts show data as pictures: column, bar, line, pie. Select data → Insert → Chart. Print: Page Layout → Orientation, Print Area; File → Print.', ['Select names and marks.', 'Insert → Column Chart.', 'Add a chart title.'], [['F11', 'Quick chart in a new sheet']], 'Make a bar chart of marks.', 'excel'),
      L('Project - salary sheet and GST bill', 'Salary: Basic, HRA = 20% of basic (=B2*20%), DA, Total. GST bill: Qty × Rate = Amount, GST = 18% of Amount, Grand Total = Amount + GST. VLOOKUP finds data from a table: =VLOOKUP(id, table, column, FALSE).', ['Columns: Name, Basic, HRA, DA, Total.', 'HRA: =B2*0.2', 'Total: =B2+C2+D2', 'Bill: =B2*C2 for amount, =D2*0.18 for GST.'], [], 'Make a GST bill for 3 items with grand total.', 'excel'),
    ],
    quiz: [
      ['Every Excel formula starts with ___?', '=', '+', '#', '@'],
      ['Cell C5 is column ___ row ___?', 'C, 5', '5, C', 'C5, 1', 'None'],
      ['=SUM(A1:A5) does what?', 'Adds A1 to A5', 'Averages', 'Counts', 'Finds max'],
      ['Function for the highest value?', 'MAX', 'MIN', 'TOP', 'HIGH'],
      ['=IF() is used for ___?', 'Decisions', 'Pictures', 'Printing', 'Colours'],
      ['A pie chart shows ___?', 'Parts of a whole', 'Only text', 'Time', 'Letters'],
      ['AutoSum shortcut?', 'Alt + =', 'Ctrl + S', 'Ctrl + A', 'F7'],
      ['An Excel file is called a ___?', 'Workbook', 'Document', 'Slide', 'Database']],
  },
  {
    id: 'powerpoint', emoji: '📽️', title: 'MS PowerPoint', level: 'Intermediate', hours: 4,
    lessons: [
      L('Slides and layouts', 'PowerPoint makes presentations with slides. Layouts: Title slide, Title and Content, Two Content, Picture with Caption. Themes give colours and fonts.', ['Start → PowerPoint → Blank presentation.', 'Type a title and your name.', 'Home → New Slide (Ctrl + M).', 'Design → pick a theme.'], [['Ctrl + M', 'New slide'], ['F5', 'Start slide show']], 'Plan 5 slides about your village or city in Notepad.', 'notepad'),
      L('Pictures, shapes, charts and video', 'Insert → Pictures, Shapes, Icons, SmartArt, Chart, Table, Video, Audio.', ['Insert → Pictures → choose a photo.', 'Insert → SmartArt → Process to show steps.', 'Insert → Chart → Column.'], [], 'Make one slide-like page with a picture in WordPad.', 'wordpad'),
      L('Animations and transitions', 'Transition = effect when moving to the next slide (Fade, Push). Animation = effect on one object (Fly In, Appear). Do not use too many effects.', ['Transitions → Fade → Apply to All.', 'Select text → Animations → Fly In.', 'Animation Pane → set order and timing.'], [], 'Choose 2 transitions and 2 animations for your project.', 'notepad'),
      L('Presenting well', '6 × 6 rule: about 6 lines per slide, 6 words per line. Big fonts (28+), clear pictures, practise speaking. Slide Show → From Beginning (F5). Save as PDF to share.', ['Press F5 to start.', 'Use arrow keys to move.', 'Press Esc to stop.'], [['Esc', 'End slide show'], ['B', 'Black screen during show']], 'Present your 5 slides to your family.', 'wordpad'),
    ],
    quiz: [
      ['Shortcut for a new slide?', 'Ctrl + M', 'Ctrl + N', 'Ctrl + S', 'Ctrl + L'],
      ['Start a slide show with ___?', 'F5', 'F7', 'F2', 'F1'],
      ['Effect between slides is a ___?', 'Transition', 'Animation', 'Theme', 'Layout'],
      ['The 6 × 6 rule is about ___?', 'Text on a slide', 'Number of slides', 'Fonts', 'Colours'],
      ['To stop the slide show press ___?', 'Esc', 'Enter', 'Space', 'Tab'],
      ['SmartArt is used to show ___?', 'Steps and diagrams', 'Videos', 'Music', 'Passwords']],
  },
];
