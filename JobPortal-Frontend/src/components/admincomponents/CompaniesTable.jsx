import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return <div>Loading...</div>;
  }
  const handleDeleteCompany = async (companyid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${COMPANY_API_ENDPOINT}/delete/${companyid}`,
        {
          withCredentials: true, // Pass authentication token with cookies
        }
      );

      if (response.data.status) {
        alert("Company deleted successfully!");
        setFilterCompany((prevCompany) =>
          prevCompany.filter((company) => company._id !== companyid)
        );
      } else {
        alert("Failed to delete company: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Something went wrong while deleting the company.");
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>Your recent registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Sr. No</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Companies Added
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company, index) => (
              <TableRow key={company.id}>
                <TableCell className="w-16">{index + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo || "default-logo-url"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div
                        onClick={() => handleDeleteCompany(company._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Trash2 className="w-4"></Trash2>
                        <span>Remove</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
