import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPortalRoutingModule } from './main-portal-routing.module';
import { MainPortalComponent } from './main-portal.component';
import { HomeComponent } from './main-component/home/home.component';
import { AboutComponent } from './main-component/about/about.component';
import { ContactComponent } from './main-component/contact/contact.component';
import { HeaderComponent } from './main-component/header/header.component';
import { FooterComponent } from './main-component/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterThroughEmailComponent } from './main-component/public/register-through-email/register-through-email.component';
import { EmailTemplateComponent } from './main-component/public/email-template/email-template.component';
import { PdfPageComponent } from './main-component/public/pdf-page/pdf-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProductsComponent } from './main-component/products/products.component';
import { Customer360Component } from './main-component/products/products-child/customer360/customer360.component';
import { SalesComponent } from './main-component/products/products-child/sales/sales.component';
import { ServiceComponent } from './main-component/products/products-child/service/service.component';
import { MarketingComponent } from './main-component/products/products-child/marketing/marketing.component';
import { CommerceComponent } from './main-component/products/products-child/commerce/commerce.component';
import { DataCloudComponent } from './main-component/products/products-child/data-cloud/data-cloud.component';
import { TableauComponent } from './main-component/products/products-child/tableau/tableau.component';
import { MulesoftComponent } from './main-component/products/products-child/mulesoft/mulesoft.component';
import { SlackComponent } from './main-component/products/products-child/slack/slack.component';
import { PlatformComponent } from './main-component/products/products-child/platform/platform.component';
import { IndustriesComponent } from './main-component/industries/industries.component';
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
import { LearningComponent } from './main-component/learning/learning.component';
import { LearningOnTrailheadComponent } from './main-component/learning/learning-child/learning-on-trailhead/learning-on-trailhead.component';
import { CustomerServiceComponent } from './main-component/learning/learning-child/customer-service/customer-service.component';
import { EventsAndExperiencesComponent } from './main-component/learning/learning-child/events-and-experiences/events-and-experiences.component';
import { ByTopicComponent } from './main-component/learning/learning-child/by-topic/by-topic.component';
import { ByRoleComponent } from './main-component/learning/learning-child/by-role/by-role.component';
import { ByContentTypeComponent } from './main-component/learning/learning-child/by-content-type/by-content-type.component';
import { BlogComponent } from './main-component/learning/learning-child/blog/blog.component';
import { SuccessCenterComponent } from './main-component/learning/learning-child/success-center/success-center.component';
import { SupportComponent } from './main-component/support/support.component';
import { HelpAndDocumentationComponent } from './main-component/support/support-child/help-and-documentation/help-and-documentation.component';
import { ComunitiesComponent } from './main-component/support/support-child/comunities/comunities.component';
import { CustomerSuccessComponent } from './main-component/support/support-child/customer-success/customer-success.component';
import { CompanyComponent } from './main-component/company/company.component';
import { AboutHumanoidComponent } from './main-component/company/company-child/about-humanoid/about-humanoid.component';
import { OurValuesComponent } from './main-component/company/company-child/our-values/our-values.component';
import { OurImpactComponent } from './main-component/company/company-child/our-impact/our-impact.component';
import { CareerComponent } from './main-component/company/company-child/career/career.component';
import { NewsComponent } from './main-component/company/company-child/news/news.component';
import { MoreHumanoidBrandComponent } from './main-component/company/company-child/more-humanoid-brand/more-humanoid-brand.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { EndorsementComponent } from './main-component/endorsement/endorsement.component';
import { IndividualEndorsementComponent } from './main-component/endorsement/individual-endorsement/individual-endorsement.component';
import { ContractSendingThanksPageComponent } from './main-component/public/contract-sending-thanks-page/contract-sending-thanks-page.component';
// import { ExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    MainPortalComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    RegisterThroughEmailComponent,
    EmailTemplateComponent,
    PdfPageComponent,
    ProductsComponent,
    Customer360Component,
    SalesComponent,
    ServiceComponent,
    MarketingComponent,
    CommerceComponent,
    DataCloudComponent,
    TableauComponent,
    MulesoftComponent,
    SlackComponent,
    PlatformComponent,
    IndustriesComponent,
    AutomotiveComponent,
    ComunicationsComponent,
    ConsumerGoodsComponent,
    EducationComponent,
    FinancialServicesComponent,
    HealthcareAndLifescienceComponent,
    ManufacturingComponent,
    MediaComponent,
    NonProfitComponent,
    PublicSectorComponent,
    RetailComponent,
    LearningComponent,
    LearningOnTrailheadComponent,
    CustomerServiceComponent,
    EventsAndExperiencesComponent,
    ByTopicComponent,
    ByRoleComponent,
    ByContentTypeComponent,
    BlogComponent,
    SuccessCenterComponent,
    SupportComponent,
    HelpAndDocumentationComponent,
    ComunitiesComponent,
    CustomerSuccessComponent,
    CompanyComponent,
    AboutHumanoidComponent,
    OurValuesComponent,
    OurImpactComponent,
    CareerComponent,
    NewsComponent,
    MoreHumanoidBrandComponent,
    EndorsementComponent,
    IndividualEndorsementComponent,
    ContractSendingThanksPageComponent
  ],
  imports: [
    CommonModule,
    MainPortalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ]
})
export class MainPortalModule { }
