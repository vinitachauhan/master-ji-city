// All Schools Directory - Gulaothi, Bulandshahr, Sikandrabad, Delhi, Lucknow and Dehradun.
// School names are from the owner's list. Principal names, phone numbers, student and teacher counts are
// DEMO values (marked demo: true) - the phone numbers use 00000 so they never ring a real person.
export const DIRECTORY_CITIES = ['Gulaothi', 'Bulandshahr', 'Sikandrabad', 'Delhi', 'Lucknow', 'Dehradun'];
export const SCHOOL_TYPES = ['Private', 'Govt'];
export const SCHOOL_BOARDS = ['CBSE', 'UP Board', 'ICSE', 'Uttarakhand Board'];
export const SCHOOL_CLASSES = ['Play to 12th', '1 to 12th', 'Play to 8th', '1 to 8th', '1 to 5th', '4 to 12th', '6 to 12th', '7 to 12th', '9 to 12th'];
export const SCHOOL_STATUSES = ['Active', 'Pending'];

// [name, city, type, board, classes]
const LIST = [
  ['Master Ji Public School, Gulaothi', 'Gulaothi', 'Private', 'CBSE', 'Play to 12th'],
  ['S.S. Public School, Gulaothi', 'Gulaothi', 'Private', 'UP Board', '1 to 12th'],
  ['R.S. Public School, Gulaothi', 'Gulaothi', 'Private', 'CBSE', 'Play to 12th'],
  ['City Public School, Gulaothi', 'Gulaothi', 'Private', 'UP Board', 'Play to 12th'],
  ['D.A.V. Public School, Gulaothi', 'Gulaothi', 'Private', 'CBSE', 'Play to 12th'],
  ['Saraswati Vidya Mandir, Gulaothi', 'Gulaothi', 'Private', 'UP Board', '1 to 12th'],
  ['Govt. Inter College, Gulaothi', 'Gulaothi', 'Govt', 'UP Board', '6 to 12th'],
  ['Govt. Girls Inter College, Gulaothi', 'Gulaothi', 'Govt', 'UP Board', '6 to 12th'],
  ['Primary School Gulaothi - 1', 'Gulaothi', 'Govt', 'UP Board', '1 to 5th'],
  ['Primary School Gulaothi - 2', 'Gulaothi', 'Govt', 'UP Board', '1 to 5th'],
  ['Primary School Gulaothi - 3', 'Gulaothi', 'Govt', 'UP Board', '1 to 5th'],
  ["St. Mary's Convent School, Gulaothi", 'Gulaothi', 'Private', 'CBSE', 'Play to 12th'],
  ['Master Ji Public School, Bulandshahr', 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['D.A.V. Public School, Bulandshahr', 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['Delhi Public School (DPS), Bulandshahr', 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['Kendriya Vidyalaya, Bulandshahr', 'Bulandshahr', 'Govt', 'CBSE', '1 to 12th'],
  ["St. John's School, Bulandshahr", 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['S.D. Public School, Bulandshahr', 'Bulandshahr', 'Private', 'UP Board', '1 to 12th'],
  ['A.S.N. Public School, Bulandshahr', 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['Govt. Inter College, Bulandshahr', 'Bulandshahr', 'Govt', 'UP Board', '6 to 12th'],
  ['Govt. Girls Inter College, Bulandshahr', 'Bulandshahr', 'Govt', 'UP Board', '6 to 12th'],
  ['Bright Land Public School, Bulandshahr', 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['City Montessori School, Bulandshahr', 'Bulandshahr', 'Private', 'CBSE', 'Play to 12th'],
  ['R.K. Public School, Bulandshahr', 'Bulandshahr', 'Private', 'UP Board', '1 to 12th'],
  ['Master Ji Public School, Sikandrabad', 'Sikandrabad', 'Private', 'CBSE', 'Play to 12th'],
  ['S.K. Public School, Sikandrabad', 'Sikandrabad', 'Private', 'UP Board', '1 to 12th'],
  ['D.A.V. Public School, Sikandrabad', 'Sikandrabad', 'Private', 'CBSE', 'Play to 12th'],
  ['Govt. Inter College, Sikandrabad', 'Sikandrabad', 'Govt', 'UP Board', '6 to 12th'],
  ['Govt. Girls Inter College, Sikandrabad', 'Sikandrabad', 'Govt', 'UP Board', '6 to 12th'],
  ['Saraswati Shishu Mandir, Sikandrabad', 'Sikandrabad', 'Private', 'UP Board', 'Play to 8th'],
  ['City Public School, Sikandrabad', 'Sikandrabad', 'Private', 'UP Board', 'Play to 12th'],
  ['New Era Public School, Sikandrabad', 'Sikandrabad', 'Private', 'CBSE', 'Play to 12th'],
  ['Holy Child Public School, Sikandrabad', 'Sikandrabad', 'Private', 'CBSE', 'Play to 12th'],
  ['Master Ji Public School, Delhi', 'Delhi', 'Private', 'CBSE', 'Play to 12th'],
  ['Delhi Public School, R.K. Puram, Delhi', 'Delhi', 'Private', 'CBSE', 'Play to 12th'],
  ['Modern School, Barakhamba Road, Delhi', 'Delhi', 'Private', 'CBSE', 'Play to 12th'],
  ['Sardar Patel Vidyalaya, Delhi', 'Delhi', 'Private', 'CBSE', 'Play to 12th'],
  ['Springdales School, Pusa Road, Delhi', 'Delhi', 'Private', 'CBSE', 'Play to 12th'],
  ['Kendriya Vidyalaya, Delhi Cantt, Delhi', 'Delhi', 'Govt', 'CBSE', '1 to 12th'],
  ['Govt. Boys Senior Secondary School, Delhi', 'Delhi', 'Govt', 'CBSE', '6 to 12th'],
  ['Sarvodaya Kanya Vidyalaya, Delhi', 'Delhi', 'Govt', 'CBSE', '6 to 12th'],
  ['Master Ji Public School, Lucknow', 'Lucknow', 'Private', 'CBSE', 'Play to 12th'],
  ['City Montessori School, Gomti Nagar, Lucknow', 'Lucknow', 'Private', 'ICSE', 'Play to 12th'],
  ['La Martiniere College, Lucknow', 'Lucknow', 'Private', 'ICSE', '1 to 12th'],
  ['Loreto Convent, Lucknow', 'Lucknow', 'Private', 'ICSE', '1 to 12th'],
  ['Delhi Public School, Eldeco, Lucknow', 'Lucknow', 'Private', 'CBSE', 'Play to 12th'],
  ['Kendriya Vidyalaya, Gomti Nagar, Lucknow', 'Lucknow', 'Govt', 'CBSE', '1 to 12th'],
  ['Govt. Jubilee Inter College, Lucknow', 'Lucknow', 'Govt', 'UP Board', '6 to 12th'],
  ['Govt. Girls Inter College, Lucknow', 'Lucknow', 'Govt', 'UP Board', '6 to 12th'],
  ['Master Ji Public School, Dehradun', 'Dehradun', 'Private', 'CBSE', 'Play to 12th'],
  ['The Doon School, Dehradun', 'Dehradun', 'Private', 'ICSE', '7 to 12th'],
  ["Welham Girls' School, Dehradun", 'Dehradun', 'Private', 'CBSE', '4 to 12th'],
  ["Welham Boys' School, Dehradun", 'Dehradun', 'Private', 'CBSE', '4 to 12th'],
  ["St. Joseph's Academy, Dehradun", 'Dehradun', 'Private', 'ICSE', '1 to 12th'],
  ['Summer Valley School, Dehradun', 'Dehradun', 'Private', 'CBSE', 'Play to 12th'],
  ['Kendriya Vidyalaya, Dehradun', 'Dehradun', 'Govt', 'CBSE', '1 to 12th'],
  ['Govt. Inter College, Dehradun', 'Dehradun', 'Govt', 'Uttarakhand Board', '6 to 12th'],
];

const PRINCIPALS = ['Mr. R.K. Sharma', 'Mrs. Sunita Verma', 'Mr. Ajay Tyagi', 'Mrs. Kavita Singh', 'Mr. Mohd. Irfan', 'Mrs. Neelam Gupta',
  'Mr. Satish Chauhan', 'Mrs. Anita Saxena', 'Mr. Vinod Kumar', 'Mrs. Rekha Bhati', 'Mr. Pradeep Rana', 'Sr. Mary Joseph'];

export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
// a phone number that cannot belong to anyone (Indian mobiles never start with 0)
export const demoPhone = (i) => `+91 00000 ${String(10000 + i).slice(-5)}`;

export function buildSchoolsDirectory() {
  let s = 20261126;
  const r = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 10000) / 10000; };
  return LIST.map(([name, city, type, board, classes], i) => {
    const small = classes === '1 to 5th';
    const students = small ? 100 + Math.round(r() * 15) * 10 : 300 + Math.round(r() * 60) * 10;
    return {
      id: slugify(name), name, city, type, board, classes,
      students, teachers: Math.max(5, Math.round(students / (small ? 30 : 28))),
      principal: PRINCIPALS[i % PRINCIPALS.length], phone: demoPhone(i + 1),
      status: r() < 0.8 || name.startsWith('Master Ji') ? 'Active' : 'Pending',
      inSystem: name.startsWith('Master Ji'), demo: true,
    };
  });
}
