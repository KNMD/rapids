package com.rapids.manage.controller;

import com.rapids.core.domain.*;
import com.rapids.core.service.PackService;
import com.rapids.manage.dto.ExtEntity;
import com.rapids.manage.dto.ExtStatusEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.util.List;

/**
 * Created by scott on 3/22/17.
 */
@RestController
@RequestMapping("/pack")
public class StudentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private PackService packService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ExtEntity<Pack> getPackList() {
        List<Pack> list = this.packService.getPackList();
        ExtEntity<Pack> entity = new ExtEntity<>();
        entity.setResult(list.size());
        entity.setRows(list);
        LOGGER.info("getPackList");
        return entity;
    }

    @RequestMapping(value = "/getKnowledge")
    public ExtEntity<Knowledge> getKnowledgeListByTitle(@RequestParam("title") String title) {
        List<Knowledge> list = this.packService.getKnowledgeListByTitle(title);
        ExtEntity<Knowledge> entity = new ExtEntity<>();
        entity.setResult(list.size());
        entity.setRows(list);
        LOGGER.info("getKnowledgeListByTitle");
        return entity;
    }


    @RequestMapping(value = "/savePack", method = RequestMethod.POST)
    public ExtStatusEntity savePack(@RequestParam(value = "id", required = false) Long id,
                                     @RequestParam("name") String name,
                                     @RequestParam("type") String type,
                                     @RequestParam("description") String description,
                                     @RequestParam("adminName") String adminName) {
        ExtStatusEntity result = new ExtStatusEntity();
        try {
            Pack packDTO = new Pack();
            if (id == null) {
                packDTO.setCreateBy( URLDecoder.decode(adminName, "UTF-8"));
            } else {
                packDTO = this.packService.getById(id);
            }
            packDTO.setName(name);
            packDTO.setType(Pack.Type.MATH);
            packDTO.setDescription(description);
            Pack pack = this.packService.save(packDTO);
            if (null == pack) {
                result.setMsg("添加或修改账号失败");
                result.setSuccess(false);
            } else {
                result.setMsg("succeed");
                result.setSuccess(true);
            }
        } catch (Exception ex) {
            LOGGER.error("save admin error", ex);
            result.setMsg("保存失败");
            result.setSuccess(false);
        }
        LOGGER.info("savePack");
        return result;
    }

    @RequestMapping(value = "/saveKnowledge", method = RequestMethod.POST)
    public ExtStatusEntity saveKnowledge(@RequestParam(value = "id", required = false) Long id,
                                     @RequestParam("packId") Long packId,
                                     @RequestParam("name") String name,
                                     @RequestParam("title") String title,
                                     @RequestParam("description") String description,
                                     @RequestParam("descPic") String descPic,
                                     @RequestParam("memo") String memo,
                                     @RequestParam("memoPic") String memoPic,
                                     @RequestParam("adminName") String adminName) {
        ExtStatusEntity result = new ExtStatusEntity();
        try {
            Knowledge knowledgeDTO = new Knowledge();
            if (id == null) {
                knowledgeDTO.setEditor(URLDecoder.decode(adminName, "UTF-8"));
                knowledgeDTO.setPackId(packId);
            } else {
                knowledgeDTO = this.packService.getKnowledgeById(id);
            }
            knowledgeDTO.setName(name);
            knowledgeDTO.setTitle(title);
            knowledgeDTO.setDescription(description);
            knowledgeDTO.setDescPic(descPic);
            knowledgeDTO.setMemo(memo);
            knowledgeDTO.setMemoPic(memoPic);
            Knowledge knowledge = this.packService.saveKnowledge(knowledgeDTO);
            if (null == knowledge) {
                result.setMsg("添加或修改账号失败");
                result.setSuccess(false);
            } else {
                result.setMsg("succeed");
                result.setSuccess(true);
            }
        } catch (Exception ex) {
            LOGGER.error("save admin error", ex);
            result.setMsg("保存失败");
            result.setSuccess(false);
        }
        LOGGER.info("saveKnowledge");
        return result;
    }



    @RequestMapping(value = "/delKnowledge")
    public ExtStatusEntity delKnowledge(@RequestParam("id") Long id) {
        ExtStatusEntity entity = new ExtStatusEntity();
        try {
            this.packService.delKnowledge(id);
            entity.setMsg("succeed");
            entity.setSuccess(true);
        } catch (Exception ex) {
            LOGGER.error("delKnowledge error", ex);
            entity.setMsg("删除失败");
            entity.setSuccess(false);
        }
        LOGGER.info("delKnowledge");
        return entity;
    }


    @RequestMapping(value = "/delPack")
    public ExtStatusEntity delPack(@RequestParam("id") Long id) {
        ExtStatusEntity entity = new ExtStatusEntity();
        try {
            this.packService.delPack(id);
            entity.setMsg("succeed");
            entity.setSuccess(true);
        } catch (Exception ex) {
            LOGGER.error("delPack error", ex);
            entity.setMsg("删除失败");
            entity.setSuccess(false);
        }
        LOGGER.info("delPack");
        return entity;
    }

}
