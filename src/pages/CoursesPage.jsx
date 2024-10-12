import {Badge} from "../components/badge/badge.tsx";

const departments = [
    { name: "Architecture", abbrev: "D-ARCH", website: "https://www.arch.ethz.ch" },
    { name: "Civil, Environmental and Geomatic Engineering", abbrev: "D-BAUG", website: "https://www.baug.ethz.ch" },
    { name: "Biosystems Science and Engineering", abbrev: "D-BSSE", website: "https://www.bsse.ethz.ch" },
    { name: "Computer Science", abbrev: "D-INFK", website: "https://www.inf.ethz.ch" },
    { name: "Information Technology and Electrical Engineering", abbrev: "D-ITET", website: "https://www.ee.ethz.ch" },
    { name: "Materials", abbrev: "D-MATL", website: "https://www.mat.ethz.ch" },
    { name: "Mechanical and Process Engineering", abbrev: "D-MAVT", website: "https://www.mavt.ethz.ch" },
    { name: "Biology", abbrev: "D-BIOL", website: "https://www.biol.ethz.ch" },
    { name: "Chemistry and Applied Biosciences", abbrev: "D-CHAB", website: "https://www.chab.ethz.ch" },
    { name: "Mathematics", abbrev: "D-MATH", website: "https://www.math.ethz.ch" },
    { name: "Physics", abbrev: "D-PHYS", website: "https://www.phys.ethz.ch" },
    { name: "Earth and Planetary Sciences", abbrev: "D-EAPS", website: "https://www.eaps.ethz.ch" },
    { name: "Health Sciences and Technology", abbrev: "D-HEST", website: "https://www.hest.ethz.ch" },
    { name: "Environmental Systems Science", abbrev: "D-USYS", website: "https://www.usys.ethz.ch" },
    { name: "Management, Technology and Economics", abbrev: "D-MTEC", website: "https://www.mtec.ethz.ch" },
    { name: "Humanities, Social and Political Sciences", abbrev: "D-GESS", website: "https://www.gess.ethz.ch" }
];

const CoursesPage = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Department Tags</h1>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b-2 p-2">Department</th>
                        <th className="border-b-2 p-2">Tag</th>
                        <th className="border-b-2 p-2">Website</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border-b p-2">{dept.name}</td>
                            <td className="border-b p-2">
                                <Badge variant={"secondary"}>
                                    {dept.abbrev}
                                </Badge>

                            </td>
                            <td className="border-b p-2">
                                <a href={dept.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {dept.website}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoursesPage;
