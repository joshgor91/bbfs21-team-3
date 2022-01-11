import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Lato', sans-serif
    transition: all 0.50s linear;
  }
  .card, .table, .table.td{
  background ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: ${({ theme }) => theme.cardBorder}
  }
  
  .table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
   color: ${({ theme }) => theme.tableText};
   background: ${({ theme }) => theme.tableStripeBackground};
}
  
  .btn{
   background: ${({ theme }) => theme.buttonBackground};
   border: ${({ theme }) => theme.buttonBorder};
   color: ${({ theme }) => theme.text};
  }
 
 // .navbar{
 // background: ${({ theme }) => theme.navbarBackground};
 // }
 
 .form{
  color: ${({ theme }) => theme.formText};
 }
 
 .modal-title{
 color: ${({ theme }) => theme.modalTitle};
 }
 
 .modal-header{
 background: ${({ theme }) => theme.modalTitleBackground};
 }
 
 .form-label{
 color: ${({ theme }) => theme.formLabel};
 }
 
.d-block{
 background ${({ theme }) => theme.body};
}
  `