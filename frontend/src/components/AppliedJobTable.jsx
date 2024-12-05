import React from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
<>
<div>
     <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item,index)=>(
                    <TableRow key={index}>
                        <TableHead>Date</TableHead>
                        <TableHead>fullstack developer</TableHead>
                        <TableHead>airline</TableHead>
                        <TableHead className="text-right"><Badge>panding</Badge></TableHead>

                    </TableRow>
                ))
            }
        </TableBody>
     </Table>
    </div>

</>
  )
}

export default AppliedJobTable
