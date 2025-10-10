import { ApiProperty } from "@nestjs/swagger"

export class CreateInterviewDto {
     @ApiProperty()
        date:string
    
        @ApiProperty()
        timeSlots:string
    
        @ApiProperty({
            description:"The id of the labour for which interview has to create"
        })
        candidateId:number
}
