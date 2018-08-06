<?php

/**
 *
 * @category   Ceicom
 * @package   Ceicom_EbitIntegration
 * @author      Jonatan <jonatan@ceicom.com.br>
 * @website    http://www.ceicom.com.br
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class Ceicom_EbitIntegration_Block_Adminhtml_Pagamentos extends Mage_Adminhtml_Block_System_Config_Form_Field_Array_Abstract
{
  /**
  * Prepare to render
  */


 protected $_itemRendererEbit;
 protected $_itemRendererPag;

   public function _prepareToRender()
   {

       $this->addColumn('idebit', array(
           'label' => Mage::helper('ceicom_ebitintegration')->__('IdEbit'),
           'renderer' => $this->_getRendererEbit(),
       ));

       $this->addColumn('pagamentos', array(
           'label' => Mage::helper('ceicom_ebitintegration')->__('Pagamentos'),
           'renderer' => $this->_getRendererPag(),
       ));


       $this->_addAfter = false;
       $this->_addButtonLabel = Mage::helper('ceicom_ebitintegration')->__('Relacionar outro');

   }

 protected function  _getRendererEbit()
   {

       if (!$this->_itemRendererEbit) {
           $this->_itemRendererEbit = $this->getLayout()->createBlock(
               'ceicom_ebitintegration/adminhtml_form_field_idebit', '',
               array('is_render_to_js_template' => true)
           );
       }
       return $this->_itemRendererEbit;
   }

   protected function  _getRendererPag()
     {

         if (!$this->_itemRendererPag) {
             $this->_itemRendererPag = $this->getLayout()->createBlock(
                 'ceicom_ebitintegration/adminhtml_form_field_pagamentos', '',
                 array('is_render_to_js_template' => true)
             );
         }
         return $this->_itemRendererPag;
     }

   protected function _prepareArrayRow(Varien_Object $row)
   {
     $row->setData(
         'option_extra_attr_' . $this->_getRendererPag()
             ->calcOptionHash($row->getData('pagamentos')),
         'selected="selected"'
     );

     $row->setData(
         'option_extra_attr_' . $this->_getRendererEbit()
             ->calcOptionHash($row->getData('idebit')),
         'selected="selected"'
     );

   }
}


 ?>
