<?php

/**
 *
 * @category   Ceicom
 * @package   Ceicom_EbitIntegration
 * @author      Jonatan <jonatan@ceicom.com.br>
 * @website    http://www.ceicom.com.br
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class Ceicom_EbitIntegration_Block_Adminhtml_Form_Field_Pagamentos
    extends Mage_Core_Block_Html_Select
{
    public function _toHtml()
    {

        $payments = Mage::getSingleton('payment/config')->getActiveMethods();
        $methods = array(array('value'=>'', 'label'=>Mage::helper('adminhtml')->__('--Selecione--')));

        foreach ($payments as $paymentCode => $paymentModel) {
             $paymentTitle = Mage::getStoreConfig('payment/'.$paymentCode.'/title');
             $methods[$paymentCode] = array(
                 'label'   => $paymentTitle,
                 'value' => $paymentCode,
             );
         }

        foreach ($methods as $option) {
            $this->addOption($option['value'], $option['label']);
        }

        return parent::_toHtml();
    }

    public function setInputName($value)
    {
        return $this->setName($value);
    }
}
