import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Response,
  Request,
} from '@nestjs/common';
import { CompanyDto } from '../../domain/dto/company.dto';
import { PaginateOptions } from 'src/domain/services/crud.service';
import { ILike } from 'typeorm';
import { CompanyService } from 'src/domain/services/company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly _service: CompanyService) {}

  /**
   *
   * @returns {PaginateResponseDto{}} Returns all companies with theirs pagination
   * @param {PaginateOptions} request
   */
  @Get()
  public async findAll(@Response() res, @Query() options: PaginateOptions) {
    const { page, offset, search } = options;
    const filter = {};
    const companies = await this._service.paginate({
      page,
      offset,
      order: { idCompany: 'DESC' },
      where: [
        ...(search !== null && search !== undefined && search != ''
          ? [
              {
                ...filter,
                name: ILike(`%${options.search}%`),
              },
              {
                ...filter,
                address: ILike(`%${options.search}%`),
              },
              {
                ...filter,
                nit: ILike(`%${options.search}%`),
              },
              {
                ...filter,
                phone: ILike(`%${options.search}%`),
              },
            ]
          : [
              {
                ...filter,
              },
            ]),
      ],
    });

    return res.status(HttpStatus.OK).json(companies);
  }

  /**
   *
   * @returns {CompanyDto{}} Returns a company by id
   * @param {id} request
   */
  @Get('/:id')
  public async findOne(@Response() res, @Param() param) {
    const company = await this._service.findOne({
      where: { idCompany: param.id },
    });

    if (company) {
      return res.status(HttpStatus.OK).json(company);
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "company doesn't exist!" });
  }

  /**
   *
   * @returns {CompanyDto{}} Returns a new company
   * @param {CompanyDto} request
   */
  @Post()
  public async create(@Response() res, @Body() companyDto: CompanyDto) {
    companyDto.name = companyDto.name.toUpperCase();
    companyDto.address = companyDto.address.toUpperCase();
    companyDto.nit = companyDto.nit.toUpperCase();
    companyDto.phone = companyDto.phone.toUpperCase();
    const company = await this._service.create(companyDto);
    return res.status(HttpStatus.OK).json(company);
  }

  /**
   *
   * @returns {CompanyDto{}} Returns the deleted company
   * @param {id} request
   * @param {CompanyDto} request
   */
  @Delete('/:id')
  public async delete(@Param() param, @Response() res) {
    const options = { where: { idCompany: param.id } };
    const company = await this._service.delete(options);
    if (company) {
      return res.status(HttpStatus.OK).json(company);
    }
  }

  /**
   *
   * @returns {CompanyDto{}} Returns a updated company
   * @param {id} request
   * @param {CompanyDto} request
   */
  @Patch('/:id')
  public async update(@Param() param, @Response() res, @Body() body) {
    body.name = body.name.toUpperCase();
    body.address = body.address.toUpperCase();
    body.nit = body.nit.toUpperCase();
    body.phone = body.phone.toUpperCase();
    const options = { where: { idCompany: param.id } };
    const company = await this._service.update(body, options);

    if (company) {
      return res.status(HttpStatus.OK).json(company);
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "company doesn't exist!" });
  }
}
