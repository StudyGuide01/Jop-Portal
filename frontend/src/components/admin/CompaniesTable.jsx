import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
// import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'
import Companies from './Companies'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    // useGetAllCompanies();
    const navigate = useNavigate();
    const {allCompanys} = useSelector((store)=>store.company)
  const [filterCompany,setFilterCompany]=useState(allCompanys)
 const {searchCompanyByText} = useSelector((store)=>store.company);
 useEffect(()=>{
const filteredCompany = allCompanys.length >= 0 && allCompanys.filter((company)=>{
  if(!searchCompanyByText){
    return true
  }
  return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());

// setFilterCompany(filteredCompany);
})
setFilterCompany(filteredCompany);
 },[allCompanys,searchCompanyByText]);
 
    return (
    <>
    <div>
    <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
   <TableHeader>
    <TableRow>
        <TableHead>Logo</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Action</TableHead>
    </TableRow>
   </TableHeader>
   <TableBody>
   {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} className='w-20 h-20 rounded-full'/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span >Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
   </TableBody>
   
   
   
   
    </Table>
      </div>
    </>
  )
}

export default CompaniesTable
