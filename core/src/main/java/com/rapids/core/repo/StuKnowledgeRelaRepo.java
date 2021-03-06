package com.rapids.core.repo;

import com.rapids.core.domain.StuKnowledgeRela;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

/**
 * @author David on 17/2/28.
 */
@Repository
public interface StuKnowledgeRelaRepo extends PagingAndSortingRepository<StuKnowledgeRela, String> {


    @Query(value = "SELECT * FROM StuKnowledgeRela " +
            "WHERE studentId = ?1 " +
            "AND leanSeq < ?2 " +
            "AND deleted = 0 " +
            "AND reviewed = 1 " +
            "ORDER BY leanSeq LIMIT 1", nativeQuery = true)
    StuKnowledgeRela findNextByTime(Long studentId, long timestamp);

    @Query(value = "SELECT * FROM StuKnowledgeRela " +
            "WHERE studentId = ?1 " +
            "AND deleted = 0 " +
            "AND enabled = 1 " +
            "AND reviewed = 0 " +
            "ORDER BY createTime LIMIT 1", nativeQuery = true)
    StuKnowledgeRela findNext(Long studentId);

    @Query(value = "SELECT * FROM StuKnowledgeRela " +
            "WHERE studentId = ?1 AND enableTime > ?2 AND enableTime < ?3 LIMIT 1", nativeQuery = true)
    StuKnowledgeRela findEnableByDay(long studentId, String startDateFormat, String endDateFormat);

    @Modifying
    @Query(value = "UPDATE StuKnowledgeRela SET enabled = 1, enableTime = ?1 " +
            "WHERE studentId = ?2 AND enabled = 0 LIMIT ?3", nativeQuery = true)
    int enableKnowledgeByStudentId(Date enableDate, long studentId, int limit);

    @Query(value = "SELECT * FROM StuKnowledgeRela " +
            "WHERE studentId = ?1 AND knowledgeId = ?2", nativeQuery = true)
    StuKnowledgeRela findByStudentIdAndKnowledgeId(long studentId, long knowledgeId);

    @Query(value = "SELECT * FROM StuKnowledgeRela WHERE studentId = ?1 and deleted = 0 LIMIT 1", nativeQuery = true)
    StuKnowledgeRela hasDeleteStuKnowledgeRela(long studentId);

    List<StuKnowledgeRela> findByStudentIdAndPackId(long studentId, long packId);

    Long deleteByStudentIdAndPackId(long studentId, long packId);

    Long deleteByStudentId(long studentId);

    Long deleteByKnowledgeId(long knowledgeId);

}
