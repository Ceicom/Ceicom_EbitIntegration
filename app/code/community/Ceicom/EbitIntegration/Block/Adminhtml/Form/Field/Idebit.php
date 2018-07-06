<?php
class Ceicom_EbitIntegration_Block_Adminhtml_Form_Field_Idebit
    extends Mage_Core_Block_Html_Select
{
    public function _toHtml()
    {


      $options = array
        (
          array("value" => "14","label" => "14 (Outros)",),
          array("value" => "05","label" => "05 (Cartão de Crédito)",),
          array("value" => "08","label" => "08 (Boleto Bancário)",),
          array("value" => "24","label" => "24 (Cartão da Loja)",),
          array("value" => "25","label" => "25 (Pagamento por Celular)",),
          array("value" => "28","label" => "28 (Cartão de Débito / Débito em Conta)",)
        );


        foreach ($options as $option) {
            $this->addOption($option['value'], $option['label']);
        
        }

        return parent::_toHtml();
    }

    public function setInputName($value)
    {
        return $this->setName($value);
    }
}
