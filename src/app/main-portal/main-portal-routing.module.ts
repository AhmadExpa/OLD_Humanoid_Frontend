import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './main-component/about/about.component';
import { ContactComponent } from './main-component/contact/contact.component';
import { HomeComponent } from './main-component/home/home.component';
import { AutomotiveComponent } from './main-component/industries/industries-child/automotive/automotive.component';
import { ComunicationsComponent } from './main-component/industries/industries-child/comunications/comunications.component';
import { ConsumerGoodsComponent } from './main-component/industries/industries-child/consumer-goods/consumer-goods.component';
import { EducationComponent } from './main-component/industries/industries-child/education/education.component';
import { FinancialServicesComponent } from './main-component/industries/industries-child/financial-services/financial-services.component';
import { HealthcareAndLifescienceComponent } from './main-component/industries/industries-child/healthcare-and-lifescience/healthcare-and-lifescience.component';
import { ManufacturingComponent } from './main-component/industries/industries-child/manufacturing/manufacturing.component';
import { MediaComponent } from './main-component/industries/industries-child/media/media.component';
import { NonProfitComponent } from './main-component/industries/industries-child/non-profit/non-profit.component';
import { PublicSectorComponent } from './main-component/industries/industries-child/public-sector/public-sector.component';
import { RetailComponent } from './main-component/industries/industries-child/retail/retail.component';
import { IndustriesComponent } from './main-component/industries/industries.component';
import { CommerceComponent } from './main-component/products/products-child/commerce/commerce.component';
import { Customer360Component } from './main-component/products/products-child/customer360/customer360.component';
import { DataCloudComponent } from './main-component/products/products-child/data-cloud/data-cloud.component';
import { MarketingComponent } from './main-component/products/products-child/marketing/marketing.component';
import { MulesoftComponent } from './main-component/products/products-child/mulesoft/mulesoft.component';
import { PlatformComponent } from './main-component/products/products-child/platform/platform.component';
import { SalesComponent } from './main-component/products/products-child/sales/sales.component';
import { ServiceComponent } from './main-component/products/products-child/service/service.component';
import { SlackComponent } from './main-component/products/products-child/slack/slack.component';
import { TableauComponent } from './main-component/products/products-child/tableau/tableau.component';
import { ProductsComponent } from './main-component/products/products.component';
import { EmailTemplateComponent } from './main-component/public/email-template/email-template.component';
import { PdfPageComponent } from './main-component/public/pdf-page/pdf-page.component';
import { RegisterThroughEmailComponent } from './main-component/public/register-through-email/register-through-email.component';
import { MainPortalComponent } from './main-portal.component';
import { EndorsementComponent } from './main-component/endorsement/endorsement.component';
import { IndividualEndorsementComponent } from './main-component/endorsement/individual-endorsement/individual-endorsement.component';
import { ContractSendingThanksPageComponent } from './main-component/public/contract-sending-thanks-page/contract-sending-thanks-page.component';

const routes: Routes = [{
  path: '', component: MainPortalComponent, children: [
    {
      path: '',
      component: HomeComponent
    },

    {
      path: 'home',
      component: HomeComponent
    },

    {
      path: 'endorsement', component: EndorsementComponent
    },

    {
      path: 'individual-endorsement', component: IndividualEndorsementComponent
    },

    {
      path: 'products',
      component: ProductsComponent, children: [
        {
          path: 'coustomer360', component: Customer360Component
        },
        {
          path: 'sales', component: SalesComponent
        },
        {
          path: 'service', component: ServiceComponent
        },
        {
          path: 'marketing', component: MarketingComponent
        },
        {
          path: 'commerce', component: CommerceComponent
        },
        {
          path: 'data-cloud', component: DataCloudComponent
        },
        {
          path: 'tableau', component: TableauComponent
        },
        {
          path: 'mulesoft', component: MulesoftComponent
        },
        {
          path: 'slack', component: SlackComponent
        },
        {
          path: 'platform', component: PlatformComponent
        }

      ]
    },
    {
      path: 'industries', component: IndustriesComponent, children: [
        {
          path: 'automotive', component: AutomotiveComponent
        },
        {
          path: 'communications', component: ComunicationsComponent
        },
        {
          path: 'consumer-goods', component: ConsumerGoodsComponent
        },
        {
          path: 'education', component: EducationComponent
        },
        {
          path: 'financial-service', component: FinancialServicesComponent
        },
        {
          path: 'healthcare-and-lifecience', component: HealthcareAndLifescienceComponent
        },
        {
          path: 'manufacturing', component: ManufacturingComponent
        },
        {
          path: 'media', component: MediaComponent
        },
        {
          path: 'non-profit', component: NonProfitComponent
        },
        {
          path: 'public-sector', component: PublicSectorComponent
        },
        {
          path: 'retail', component: RetailComponent
        },
      ]
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'registerThroughEmail/:companyName',
      component: RegisterThroughEmailComponent
    },
    {
      path: 'emailTemplate',
      component: EmailTemplateComponent
    },
    {
      path: 'signContract/:companyName',
      component: PdfPageComponent
    },
    {
      path: 'submitSignContractPage',
      component: ContractSendingThanksPageComponent
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPortalRoutingModule { } 
