import type { Department } from "@prisma/client";

export const departments: {
  codeId: Department["code_id"];
  title: Department["title"];
  description: Department["description"];
  address: Department["address"];
  email: Department["email"];
  telephone: Department["telephone"];
  foundationDate: Department["foundation_date"];
}[] = [
  {
    codeId: "IT",
    title: "Informatics and Telematics",
    description:
      "The Department was founded in 2006 with a mission to advance Computer Science, primarily in the field of web/telematic applications, big data, machine learning and networking. The Department places strong emphasis on application domains such as internet technologies, digital transformation, e-business, e-government, e-health, advanced transport telematics,  etc." +
      "\n\nThe world-wide market favors executives that have mastered internet- and web-based technologies to support the design and development of complex information systems and advanced services. The Department's graduates are furnished with a complete set of scientific and technical skills directly related to the application fields of computer science and are therefore able to meet the modern job description requirements. The Department encourages students to develop innovative services with open-source platforms through their thesis within R&D projects and/or contribute to the University's e-service ecosystem. ",
    address: "Omirou 9, Tavros 177 78, Athens Greece",
    email: "it@email.com",
    telephone: "2100000001",
    foundationDate: new Date("2006"),
  },
  {
    codeId: "GEO",
    title: "Geography",
    description:
      "The Department of Geography was founded in 1999 and received students for the first time in the academic year 2000-2001. It is one of the two Greek university departments serving the science of Geography, a dynamic discipline that is placed at the intersection of the natural and social sciences." +
      "\n\nThe mission of the Department of Geography is (i) to promote the science of Geography, (ii) to provide high quality studies, at the undergraduate and postgraduate level, combining the scientific principles and theories of the Science of Geography with an understanding of the problems of requirements and needs of society, (iii) the development of basic and applied research in the fields of Geography at an international level (iv) the assurance of the appropriate academic environment for students, researchers and staff to make the most of their potential.",
    address: "Thiseos 70, Kallithea 176 76, Athens Greece",
    email: "geo@email.com",
    telephone: "2100000002",
    foundationDate: new Date("1999"),
  },
  {
    codeId: "NSD",
    title: "Nutritional Sciences & Dietetics",
    description:
      "The department of 'Department of Dietetics' was founded in 1992 and the first students were enrolled in 1994. In 1999, the Department was renamed the 'Department of Dietetics - Nutrition Science'. Since the academic year 2000-2001, a full-time and part-time Master's Program has also been in operation. " +
      "\n\nIt is the oldest University Department in the country in the scientific area of the Science of Nutrition and Dietetics. In addition to education, the members of the Department have significant research activity and international collaborations, factors that have made the Department one of the best in its field at a European and international level.",
    address: "Thiseos 70, Kallithea 176 76, Athens Greece",
    email: "nsd@email.com",
    telephone: "2100000003",
    foundationDate: new Date("1992"),
  },
];
