# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class CashOnDeliveryController(http.Controller):

    # @http.route('/shop/payment/cod_charges', type='json', auth='public', website=True, csrf=False)
    # def update_cod_charges(self, provider_id=None, payment_method_code=None):
    #     order = request.website.sale_get_order()
    #     print(order, provider_id, payment_method_code)
    #     if order and provider_id and payment_method_code == 'cash_on_delivery':
    #         order.set_cod_charges(int(provider_id))
    #         print(1234,order.cod_charges)
    #         return {
    #             'cod_charges': order.cod_charges,
    #             'amount_total': order.amount_total,
    #             'currency_symbol': order.currency_id.symbol or '$'
    #         }
    #     return order.set_cod_charges(int(provider_id))

    @http.route('/shop/payment/cod_charges', type='json', auth='public', website=True, csrf=False)
    def update_cod_charges(self, provider_id=None, payment_method_code=None):
        order = request.website.sale_get_order()
        if order and provider_id and payment_method_code == 'cash_on_delivery':
            order.set_cod_charges(int(provider_id))
            return {
                'cod_charges': order.cod_charges,
                'amount_total': order.amount_total,
                'currency_symbol': order.currency_id.symbol or '$'
            }
        order.set_cod_charges(int(provider_id))
        return {
            'cod_charges': 0.0,
            'amount_total': order.amount_total if order else 0.0,
            'currency_symbol': order.currency_id.symbol if order else '$'
        }